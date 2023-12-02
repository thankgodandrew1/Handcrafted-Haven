import { Db, ObjectId } from 'mongodb';
import { User } from '@/models/User';
import Joi from 'joi';
import { connectToDatabase } from '@/utils/db';

//validates user input
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(), password: Joi.string().min(6).required(),


});

let db: Db;

async function getDatabase(): Promise<Db> {
  if (!db) {
    db = await connectToDatabase();
  }
  return db;
}
// functions for CRUD operation
export async function createUser(user: User): Promise<User | null> {
  const { error, value } = userSchema.validate(user);
  if (error) { throw new Error(error.details.map((err) => err.message).join(', ')); }
  const database = await getDatabase();
  const usersCollection = database.collection<User>(process.env.USERS_COLLECTION || 'users');
  const result = await usersCollection.insertOne(value); return result.ops[0];
}

export async function getUserById(userId: string): Promise<User | null> {
  const database = await getDatabase();
  const usersCollection = database.collection<User>(process.env.USERS_COLLECTION || 'users');
  return usersCollection.findOne({ _id: new ObjectId(userId) });
}

export async function updateUser(userId: string, updatedUser: Partial<User>): Promise<User | null> { const database = await getDatabase();
  const usersCollection = database.collection<User>(process.env.USERS_COLLECTION || 'users');
  const result = await usersCollection.findOneAndUpdate(
    { _id:  new ObjectId(userId) },
    { $set: updatedUser }, { returnOriginal: false }
  ); return result.value;
}

export async function deleteUser(userId: string): Promise<boolean> { const database = await getDatabase();
  const usersCollection = database.collection<User>(process.env.USERS_COLLECTION || 'users');
  const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });
  return result.deletedCount ===  1;
}
