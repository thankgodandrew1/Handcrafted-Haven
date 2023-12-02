import { NextApiRequest, NextApiResponse } from 'next';
import { createReview, getReviewById, updateReview, deleteReview } from '@/services/reviewService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: { id } } = req;
  
  switch (method) {
    case 'GET':
      try {
        const review = await getReviewById(id as string);
        res.status(200).json(review);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'PUT':
      try {
        const updatedReview = await updateReview(id as string, req.body);
        res.status(200).json(updatedReview);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const isDeleted = await deleteReview(id as string);
        res.status(200).json({ success: isDeleted });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'POST':
      try {
        const newReview = await createReview(req.body);
        res.status(201).json(newReview);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
