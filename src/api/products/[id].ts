// import { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '../../../db/client';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   if (req.method === 'GET') {
//     try {
//       const product = await prisma.product.findUnique({
//         where: { id: Number(id) },
//       });

//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }

//       return res.status(200).json(product);
//     } catch (error) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   if (req.method === 'PUT') {
//     const { name, price, description } = req.body;

//     try {
//       const updatedProduct = await prisma.product.update({
//         where: { id: Number(id) },
//         data: { name, price, description },
//       });

//       return res.status(200).json(updatedProduct);
//     } catch (error) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   if (req.method === 'DELETE') {
//     try {
//       await prisma.product.delete({
//         where: { id: Number(id) },
//       });

//       return res.status(204).end();
//     } catch (error) {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }

//   return res.setHeader('Allow', ['GET', 'PUT', 'DELETE']).status(405).end(`Method ${req.method} Not Allowed`);
// }