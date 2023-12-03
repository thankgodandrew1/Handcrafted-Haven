import { Db, ObjectId, Collection } from 'mongodb';
import { Review } from '@/models/Review';
import Joi from 'joi';

import { connectToDatabase } from '@/utils/db';

// Validates input
const reviewSchema = Joi.object({
  productId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
});

let db: Db;

// Function to get a database connection
async function getDatabase(): Promise<Db> {
  if (!db) {
    db = await connectToDatabase();
  }
  return db;
}

// Function to get the reviews collection
async function getReviewsCollection(): Promise<Collection<Review>> {
  const database = await getDatabase();
  return database.collection<Review>(process.env.REVIEWS_COLLECTION || 'reviews');
}

// Function for common error handling
function handleValidationError(error: Joi.ValidationError): never {
  throw new Error(error.details.map((err: any) => err.message).join(', '));
}

export async function createReview(review: Review): Promise<Review> {
  try {
    // Validate input against schema
    const { value, error } = reviewSchema.validate(review);
    if (error) {
      handleValidationError(error);
    }
    const reviewsCollection = await getReviewsCollection();
    const result = await reviewsCollection.insertOne(value);
    //@ts-ignore
    return result.ops[0];
  } catch (error) {
    throw error; // Rethrow other types of errors
  }
}

export async function getReviewById(reviewId: string): Promise<Review | null> {
  const reviewsCollection = await getReviewsCollection();
  //@ts-ignore
  return reviewsCollection.findOne({ _id: new ObjectId(reviewId) });
}

export async function updateReview(reviewId: string, updatedReview: Partial<Review>): Promise<Review | null> {
  try {
    const reviewsCollection = await getReviewsCollection();
    const result = await reviewsCollection.findOneAndUpdate(
      //@ts-ignore
      { _id: new ObjectId(reviewId) }, { $set: updatedReview }, { returnDocument: 'after' }
    );
    return result.value;
  } catch (error) {
    throw error;
  }
}

export async function deleteReview(reviewId: string): Promise<boolean> {
  try {
    const reviewsCollection = await getReviewsCollection();
    //@ts-ignore
    const result = await reviewsCollection.deleteOne({ _id: new ObjectId(reviewId) });
    return result.deletedCount === 1;
  } catch (error) {
    throw error;
  }
}
