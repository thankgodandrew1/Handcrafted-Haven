import { Db, ObjectId } from 'mongodb';
import { Review } from '@/models/Review';
import Joi from 'joi';
import { connectToDatabase } from '@/utils/db';

const reviewSchema = Joi.object({
  productId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
});

let db: Db;

async function getDatabase(): Promise<Db> {
  if (!db) {
    db = await connectToDatabase();
  }
  return db;
}

export async function createReview(review: Review): Promise<Review | null> {
  const { error, value } = reviewSchema.validate(review);
  if (error) {
    throw new Error(error.details.map((err) => err.message).join(', '));
  }

  const database = await getDatabase();
  const reviewsCollection = database.collection<Review>(process.env.REVIEWS_COLLECTION || 'reviews');
  const result = await reviewsCollection.insertOne(value);
  return result.ops[0];
}

export async function getReviewById(reviewId: string): Promise<Review | null> {
  const database = await getDatabase();
  const reviewsCollection = database.collection<Review>(process.env.REVIEWS_COLLECTION || 'reviews');
  return reviewsCollection.findOne({ _id: new ObjectId(reviewId) });
}

export async function updateReview(reviewId: string, updatedReview: Partial<Review>): Promise<Review | null> {
  const database = await getDatabase();
  const reviewsCollection = database.collection<Review>(process.env.REVIEWS_COLLECTION || 'reviews');
  const result = await reviewsCollection.findOneAndUpdate(
    { _id: new ObjectId(reviewId) },
    { $set: updatedReview },
    { returnOriginal: false }
  );
  return result.value;
}

export async function deleteReview(reviewId: string): Promise<boolean> {
  const database = await getDatabase();
  const reviewsCollection = database.collection<Review>(process.env.REVIEWS_COLLECTION || 'reviews');
  const result = await reviewsCollection.deleteOne({ _id: new ObjectId(reviewId) });
  return result.deletedCount === 1;
}
