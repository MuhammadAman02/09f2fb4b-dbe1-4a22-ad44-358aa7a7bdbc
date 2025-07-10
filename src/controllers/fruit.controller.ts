import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllFruits, getFruitById } from '../services/fruit.service';

export async function getFruitsHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const fruits = await getAllFruits();
    res.status(200).send(fruits);
  } catch (error: any) {
    console.error('Error fetching fruits:', error);
    res.status(500).send({ error: 'Failed to fetch fruits' });
  }
}

export async function getFruitByIdHandler(
  req: FastifyRequest<{ Params: { id: number } }>,
  res: FastifyReply
) {
  try {
    const fruit = await getFruitById(req.params.id);
    res.status(200).send(fruit);
  } catch (error: any) {
    console.error('Error fetching fruit:', error);
    if (error.message.includes('not found')) {
      res.status(404).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Failed to fetch fruit' });
    }
  }
}