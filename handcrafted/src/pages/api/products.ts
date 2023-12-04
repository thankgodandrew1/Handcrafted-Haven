import { NextApiRequest, NextApiResponse } from 'next';
import { createProduct, getProductById, updateProduct, deleteProduct, } from '@/services/productService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query: { id } } = req;
  
  switch (method) {
    case 'GET':
      try { const product = await getProductById(id as string);
        res.status(200).json(product);
      } catch (error: any) { res.status(500).json({ error: error.message });
      }
      break;
    case 'PUT':
      try {
        const updatedProduct = await updateProduct(id as string, req.body);
        res.status(200).json(updatedProduct);
      } catch (error: any) {res.status(500).json({ error: error.message });
      } break;

    case 'DELETE':
      try {
        const isDeleted = await deleteProduct(id as string); res.status(200).json({ success: isDeleted });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'POST':
      try {
        const newProduct = await createProduct(req.body); res.status(201).json(newProduct);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      } break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`); }
}
