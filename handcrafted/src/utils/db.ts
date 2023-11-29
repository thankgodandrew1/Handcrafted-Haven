import dotenv from 'dotenv'
import { MongoClient, Db } from 'mongodb'


dotenv.config()

const { MONGODB_URI, DATABASE_NAME } = process.env;
let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<Db> {
    if ( !MONGODB_URI || !DATABASE_NAME ) {
        throw new Error('MongoDB URI or Database name is not defined in env var.');
    }
    if (!client) {
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db(DATABASE_NAME)
        console.log('Connection to MongoDB was Successful!');
    }
    
    return db;
}