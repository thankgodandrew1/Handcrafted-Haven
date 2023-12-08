import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, Db, ObjectId } from 'mongodb'
import Joi from 'joi'
import { connectToDatabase } from '@/utils/db'

const sellerSchema = Joi.object({
  // userId: Joi.string().required(), will uncomment this if logged in is functional
  profile: Joi.object({
    bio: Joi.string().required(),
    location: Joi.string().required(),
    contactInfo: Joi.object({
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      socialMedia: Joi.object({
        twitter: Joi.string(),
        facebook: Joi.string(),
        instagram: Joi.string(),
      }).optional(),
    }).required(),
    specialties: Joi.array().items(Joi.string()).required(),
    storeImage: Joi.string().required(),
    storeName: Joi.string().required(),
  }).required(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    method,
    query: { id },
  } = req
  const db = await connectToDatabase()

  if (method === 'GET') {
    try {
      const sellerId = id as string
      const sellersCollection = db.collection(
        process.env.SELLERS_COLLECTION || 'sellers',
      )
      const seller = await sellersCollection.findOne({
        _id: new ObjectId(sellerId),
      })
      res.status(200).json(seller)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } 
  // else if (method === 'PUT') {
  //   try {
  //     const updatedSeller = req.body
  //     const sellersCollection = db.collection(
  //       process.env.SELLERS_COLLECTION || 'sellers',
  //     )
  //     const result = await sellersCollection.findOneAndUpdate(
  //       { _id: new ObjectId(id as string) },
  //       { $set: updatedSeller },
  //       { returnOriginal: false },
  //     )
  //     res.status(200).json(result.value)
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message })
  //   }
  // } else if (method === 'DELETE') {
  //   try {
  //     const sellersCollection = db.collection(
  //       process.env.SELLERS_COLLECTION || 'sellers',
  //     )
  //     const result = await sellersCollection.deleteOne({
  //       _id: new ObjectId(id as string),
  //     })
  //     res.status(200).json({ success: result.deletedCount === 1 })
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message })
  //   }}
  else if (method === 'POST') {
    try {
      const seller = req.body
      // console.log('Received Seller Data:', JSON.stringify(seller, null, 2))
      const { error, value } = sellerSchema.validate(seller)
      if (error) {
        throw new Error(error.details.map((err) => err.message).join(', '))
      }
      const storeImage = req.body.profile.storeImage
     
      const mimeTypeRegex = /^data:(image\/[a-zA-Z+]+);base64,/
      const mimeTypeMatch = storeImage.match(mimeTypeRegex)

      if (!mimeTypeMatch || mimeTypeMatch.length < 2) {
        throw new Error('Invalid image format')
      }

      const mimeType = mimeTypeMatch[1] // Extracted MIME type

     
      const storeImageBuffer = Buffer.from(storeImage.split(',')[1], 'base64')

      // Update the 'value' object with the storeImage data and its MIME type
      value.profile.storeImage = `data:${mimeType};base64,${storeImageBuffer.toString(
        'base64',
      )}`
      const sellersCollection = db.collection(
        process.env.SELLERS_COLLECTION || 'sellers',
      )

      // dis logic checks if the email already exists in the database
      const existingSeller = await sellersCollection.findOne({
        'profile.contactInfo.email': seller.profile.contactInfo.email,
      })

      if (existingSeller) {
        res
          .status(400)
          .json({
            error: 'Email already exists. Please use a different email.',
          })
        return
      }

      // If email doesn't exist, insert the seller into the database
      const result = await sellersCollection.insertOne(value)

      if (result && result.insertedId) {
        const insertedSeller = await sellersCollection.findOne({
          _id: result.insertedId,
        })
        if (insertedSeller) {
          res
            .status(201)
            .json({ sellerId: insertedSeller._id, ...insertedSeller })
          // ^^^ Include sellerId in the response object
        } else {
          throw new Error('Failed to retrieve inserted seller data')
        }
      } else {
        throw new Error('Failed to insert seller into the database')
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
