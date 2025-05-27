import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../db/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'PUT') {
    const { name, email } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.setHeader('Allow', ['GET', 'PUT', 'DELETE']).status(405).end(`Method ${req.method} Not Allowed`);
}