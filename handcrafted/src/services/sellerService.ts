// services/sellerService.ts
import { Db, ObjectId } from 'mongodb';
import { Seller } from '@/models/Seller';
import Joi from 'joi';
import { connectToDatabase } from '@/utils/db';

//validates inputs
const sellerSchema = Joi.object({
  userId: Joi.string().required(),
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
  }).required(),
});

let db: Db;

async function getDatabase(): Promise<Db> {
  if (!db) {
    db = await connectToDatabase();
  } return db;
}

export async function createSeller(seller: Seller): Promise<Seller | null> {
  const { error, value } = sellerSchema.validate(seller);
  if (error) {
  throw new Error(error.details.map((err) => err.message).join(', '));
  }

  const database = await getDatabase();
  const sellersCollection = database.collection<Seller>(process.env.SELLERS_COLLECTION || 'sellers');
  const result = await sellersCollection.insertOne(value);
  return result.ops[0];
}

export async function getSellerById(sellerId: string): Promise<Seller | null> {
  const database = await getDatabase();
  const sellersCollection = database.collection<Seller>(process.env.SELLERS_COLLECTION || 'sellers');
  return sellersCollection.findOne({ _id: new ObjectId(sellerId) });
}

export async function updateSeller(sellerId: string, updatedSeller: Partial<Seller>): Promise<Seller | null> {
  const database = await getDatabase();
  const sellersCollection = database.collection<Seller>(process.env.SELLERS_COLLECTION || 'sellers');
  const result = await sellersCollection.findOneAndUpdate(
    { _id: new ObjectId(sellerId) }, { $set: updatedSeller },
    { returnOriginal: false }
  );
  return result.value;
}

export async function deleteSeller(sellerId: string): Promise<boolean> { const database = await getDatabase();
  const sellersCollection = database.collection<Seller>(process.env.SELLERS_COLLECTION || 'sellers');
  const result = await sellersCollection.deleteOne({ _id: new ObjectId(sellerId) });
  return result.deletedCount === 1;
}
