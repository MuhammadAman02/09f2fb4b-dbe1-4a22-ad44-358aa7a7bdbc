import { FastifyInstance } from 'fastify';
import { getFruitsHandler, getFruitByIdHandler, createFruitHandler } from '../controllers/fruit.controller';
import { getFruitsSchema, getFruitByIdSchema, createFruitSchema, seedFruitsSchema } from '../schemas/fruit.schema';
import { seedFruits } from '../services/fruit.service';

export async function fruitRoutes(app: FastifyInstance) {
  // GET /api/fruits - Get all fruits
  app.get('/api/fruits', {
    schema: getFruitsSchema,
    handler: getFruitsHandler,
  });

  // GET /api/fruits/:id - Get fruit by ID
  app.get('/api/fruits/:id', {
    schema: getFruitByIdSchema,
    handler: getFruitByIdHandler,
  });

  // POST /api/fruits - Create a new fruit
  app.post('/api/fruits', {
    schema: createFruitSchema,
    handler: createFruitHandler,
  });

  // POST /api/fruits/seed - Seed the database with initial fruit data
  app.post('/api/fruits/seed', {
    schema: seedFruitsSchema,
    handler: async (req, res) => {
      try {
        await seedFruits();
        res.status(200).send({ message: 'Fruits seeded successfully' });
      } catch (error: any) {
        console.error('Error seeding fruits:', error);
        res.status(500).send({ error: 'Failed to seed fruits' });
      }
    }
  });
}