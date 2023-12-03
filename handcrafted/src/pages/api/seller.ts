// api route for sellers


import { NextApiRequest, NextApiResponse } from 'next';
import { createSeller, getSellerById, updateSeller, deleteSeller, } from '@/services/sellerService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: { id } } = req;
  
  switch (method) {
    case 'GET':
      try {
        const seller = await getSellerById(id as string);
        res.status(200).json(seller);
      } catch (error: any) { res.status(500).json({ error: error.message });
      }
      break;
    case 'PUT':
      try {const updatedSeller = await updateSeller(id as string, req.body);
        res.status(200).json(updatedSeller);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const isDeleted = await deleteSeller(id as string);
        res.status(200).json({ success: isDeleted });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'POST':
      try {
        const newSeller = await createSeller(req.body);
        res.status(201).json(newSeller);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
