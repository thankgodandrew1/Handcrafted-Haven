import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, Db, ObjectId } from 'mongodb'
import Joi from 'joi'
import { connectToDatabase } from '@/utils/db'

const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
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
      const reviewId = id as string
      const reviewsCollection = db.collection(
        process.env.REVIEWS_COLLECTION || 'reviews',
      )
      const review = await reviewsCollection.findOne({
        _id: new ObjectId(reviewId),
      })
      res.status(200).json(review)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } 
   else if (method === 'POST') {
    try {
      const review = req.body
      const { error, value } = reviewSchema.validate(review)
      if (error) {
        throw new Error(error.details.map((err) => err.message).join(', '))
      }

      const reviewsCollection = db.collection(
        process.env.REVIEWS_COLLECTION || 'reviews',
      )
      const result = await reviewsCollection.insertOne(value)
      if (result && result.insertedId) {
        const insertedReview = await reviewsCollection.findOne({
          _id: result.insertedId,
        })
        if (insertedReview) {
          res.status(201).json(insertedReview)
        } else {
          throw new Error('Failed to retrieve inserted review data')
        }
      } else {
        throw new Error('Failed to insert review into the database')
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
