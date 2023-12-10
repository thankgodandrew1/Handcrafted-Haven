import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, Db, ObjectId } from 'mongodb'
import Joi from 'joi'
import { connectToDatabase } from '@/utils/db'
import multer from 'multer'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

const storySchema = Joi.object({
  sellerId: Joi.string().required(),
  storyTitle: Joi.string().required(),
  storyContent: Joi.string().required(),
  // images: Joi.array().items(Joi.string()).required(),
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
      const sellersStoryCollection = db.collection(
        process.env.SELLERS_STORY_COLLECTION || 'sellersStory',
      )
      const sellerStories = await sellersStoryCollection
        .find({ sellerId: sellerId })
        .toArray()
      res.status(200).json({ sellerStories })
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
        const story = req.body
        // console.log('Story', storu);
        // console.log('Uploaded files:', req.files);
        const { error, value } = storySchema.validate(story, {
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

        const sellersStoryCollection = db.collection(
          process.env.SELLERS_STORY_COLLECTION || 'sellersStory',
        )
        const result = await sellersStoryCollection.insertOne(value)
        if (result && result.insertedId) {
          const insertedStory = await sellersStoryCollection.findOne({
            _id: result.insertedId,
          })
          if (insertedStory) {
            res.status(201).json(insertedStory)
          } else {
            throw new Error('Failed to retrieve inserted story data')
          }
        } else {
          throw new Error('Failed to insert story into the database')
        }
      } catch (error: any) {
        res.status(400).json({ error: error.message })
      }
    })
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
