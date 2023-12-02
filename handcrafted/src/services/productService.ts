// services/productService.ts
import { Db, ObjectId } from 'mongodb';
import { Product } from '@/models/Product';
import Joi from 'joi';
import { connectToDatabase } from '@/utils/db';

const productSchema = Joi.object({
  sellerId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  images: Joi.array().items(Joi.string()).required(),
 
});

let db: Db;

async function getDatabase(): Promise<Db> {
  if (!db) {
    db = await connectToDatabase();
  }
  return db;
}

export async function createProduct(product: Product): Promise<Product | null> {
  const { error, value } = productSchema.validate(product);
  if (error) {
    throw new Error(error.details.map((err) => err.message).join(', '));
  }

  const database = await getDatabase();
  const productsCollection = database.collection<Product>(process.env.PRODUCTS_COLLECTION || 'products');
  const result = await productsCollection.insertOne(value);
  return result.ops[0];
}

export async function getProductById(productId: string): Promise<Product | null> {
  const database = await getDatabase();
  const productsCollection = database.collection<Product>(process.env.PRODUCTS_COLLECTION || 'products');
  return productsCollection.findOne({ _id: new ObjectId(productId) });
}

export async function updateProduct(productId: string, updatedProduct: Partial<Product>): Promise<Product | null> {
  const database = await getDatabase();
  const productsCollection = database.collection<Product>(process.env.PRODUCTS_COLLECTION || 'products');
  const result = await productsCollection.findOneAndUpdate(
    { _id: new ObjectId(productId) },
    { $set: updatedProduct },
    { returnOriginal: false }
  );
  return result.value;
}

export async function deleteProduct(productId: string): Promise<boolean> {
  const database = await getDatabase();
  const productsCollection = database.collection<Product>(process.env.PRODUCTS_COLLECTION || 'products');
  const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });
  return result.deletedCount === 1;
}
