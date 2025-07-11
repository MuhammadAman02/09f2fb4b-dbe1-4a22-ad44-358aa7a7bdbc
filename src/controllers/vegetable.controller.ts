import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllVegetables, getVegetableById, createVegetable } from '../services/vegetable.service';
import { AppError } from '../utils/AppError';

export async function getVegetablesHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const vegetables = await getAllVegetables();
    res.status(200).send(vegetables);
  } catch (error: any) {
    console.error('Error fetching vegetables:', error);
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Failed to fetch vegetables' });
    }
  }
}

export async function getVegetableByIdHandler(
  req: FastifyRequest<{ Params: { id: number } }>,
  res: FastifyReply
) {
  try {
    const vegetable = await getVegetableById(req.params.id);
    res.status(200).send(vegetable);
  } catch (error: any) {
    console.error('Error fetching vegetable:', error);
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Failed to fetch vegetable' });
    }
  }
}

export async function createVegetableHandler(
  req: FastifyRequest<{ Body: { name: string; color: string; category: string } }>,
  res: FastifyReply
) {
  try {
    const vegetable = await createVegetable(req.body);
    res.status(201).send(vegetable);
  } catch (error: any) {
    console.error('Error creating vegetable:', error);
    if (error instanceof AppError) {
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Failed to create vegetable' });
    }
  }
}