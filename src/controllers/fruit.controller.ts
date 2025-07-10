import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllFruits, getFruitById, createFruit } from '../services/fruit.service';
import { AppError } from '../utils/AppError';

export async function getFruitsHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const fruits = await getAllFruits();
    res.status(200).send(fruits);
  } catch (error: any) {
    console.error('Error fetching fruits:', error);
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Failed to fetch fruits' });
    }
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
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Failed to fetch fruit' });
    }
  }
}

export async function createFruitHandler(
  req: FastifyRequest<{ Body: { name: string; color: string; category: string } }>,
  res: FastifyReply
) {
  try {
    const fruit = await createFruit(req.body);
    res.status(201).send(fruit);
  } catch (error: any) {
    console.error('Error creating fruit:', error);
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Failed to create fruit' });
    }
  }
}