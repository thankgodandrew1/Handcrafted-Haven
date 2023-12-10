import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, Db, ObjectId } from 'mongodb'
import Joi from 'joi'
import { connectToDatabase } from '@/utils/db'
import multer from 'multer'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
// import { v4 as uuidv4 } from 'uuid';

const categories = [
  'Jewelry',
  'Home Decor',
  'Art',
  'Clothing',
  'Accessories',
  'Pottery',
  'Woodwork',
  'Toys',
  'Handbag',
  'Furniture',
]

const productSchema = Joi.object({
  sellerId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  // images: Joi.array().items(Joi.any().required()).min(1).required(),
  category: Joi.string()
    .valid(...categories)
    .required(),
})

export const config = {
  api: {
    bodyParser: false,
  },
}
declare module 'next' {
  export interface NextApiRequest {
    files: any
  }
}
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  // limits: { fileSize: 7 * 1024 * 1024 } no time to add this to the frontend to display error
})
const handleFileUploads = upload.array('images')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    method,
    query: { id },
  } = req
  const db = await connectToDatabase()
  
  const expressRes = res as unknown as ExpressResponse;
  const expressReq = req as unknown as ExpressRequest;

  if (method === 'GET') {
    try {
      const sellerId = id as string
      const productsCollection = db.collection(
        process.env.PRODUCTS_COLLECTION || 'products',
      )
      const products = await productsCollection
        .find({ sellerId: sellerId })
        .toArray()
      res.status(200).json({ products })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
  //  else if (method === 'PUT') {
  //   try {
  //     const updatedProduct = req.body
  //     const productsCollection = db.collection(
  //       process.env.PRODUCTS_COLLECTION || 'products',
  //     )
  //     const result = await productsCollection.findOneAndUpdate(
  //       { _id: new ObjectId(id as string) },
  //       { $set: updatedProduct },
  //       { returnOriginal: false },
  //     )
  //     res.status(200).json(result.value)
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message })
  //   }
  // } 
  else if (method === 'DELETE') {
    try {
      const productsCollection = db.collection(
        process.env.PRODUCTS_COLLECTION || 'products',
      )
      const result = await productsCollection.deleteOne({
        _id: new ObjectId(id as string),
      })
      res.status(200).json({ success: result.deletedCount === 1 })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else if (method === 'POST') {
    handleFileUploads(expressReq, expressRes, async (err: any) => {
      if (err) {
        console.error('File upload error:', err)
        return res.status(500).json({ error: 'File upload failed' })
      }
      try {
        const product = req.body
        // console.log('Product', product);
        // console.log('Uploaded files:', req.files);
        const { error, value } = productSchema.validate(product, {
          abortEarly: false,
        })
        if (error) {
          console.error('Validation Error:', error.details)
          throw new Error('Invalid crafted item data')
        }

        const images = req.files as Express.Multer.File[]
        const imageBase64Data = []
        const imageTypes = []

        // Loop through the uploaded images and convert them to Base64 format
        if (images && images.length > 0) {
          for (const image of images) {
            const base64Data = image.buffer.toString('base64') // Convert image buffer to Base64
            const mimeType = image.mimetype.split('/')[1] // Extract image type

            // Push Base64 data and image type to respective arrays
            imageBase64Data.push(`data:image/${mimeType};base64,${base64Data}`)
            imageTypes.push(mimeType)
          }
        }

        // Update the 'images' property of the product with the Base64 encoded data and types
        value.images = imageBase64Data
        value.imageTypes = imageTypes

        const productsCollection = db.collection(
          process.env.PRODUCTS_COLLECTION || 'products',
        )
        const result = await productsCollection.insertOne(value)
        if (result && result.insertedId) {
          const insertedProduct = await productsCollection.findOne({
            _id: result.insertedId,
          })
          if (insertedProduct) {
            res.status(201).json(insertedProduct)
          } else {
            throw new Error('Failed to retrieve inserted product data')
          }
        } else {
          throw new Error('Failed to insert product into the database')
        }
      } catch (error: any) {
        res.status(400).json({ error: error.message })
      }
    })
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
