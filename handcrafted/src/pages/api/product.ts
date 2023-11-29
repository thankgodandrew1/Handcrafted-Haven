import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from "../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const db = await connectToDatabase();
        const COLLECTION_NAME = process.env.COLLECTION_NAME as string;

        const products = await db.collection(COLLECTION_NAME).find({}).toArray();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
} 