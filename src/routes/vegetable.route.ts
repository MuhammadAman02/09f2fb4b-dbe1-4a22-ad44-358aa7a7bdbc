import { FastifyInstance } from 'fastify';
import { getVegetablesHandler, getVegetableByIdHandler, createVegetableHandler } from '../controllers/vegetable.controller';
import { getVegetablesSchema, getVegetableByIdSchema, createVegetableSchema, seedVegetablesSchema } from '../schemas/vegetable.schema';
import { seedVegetables } from '../services/vegetable.service';

export async function vegetableRoutes(app: FastifyInstance) {
  // GET /api/vegetables - Get all vegetables
  app.get('/api/vegetables', {
    schema: getVegetablesSchema,
    handler: getVegetablesHandler,
  });

  // GET /api/vegetables/:id - Get vegetable by ID
  app.get('/api/vegetables/:id', {
    schema: getVegetableByIdSchema,
    handler: getVegetableByIdHandler,
  });

  // POST /api/vegetables - Create a new vegetable
  app.post('/api/vegetables', {
    schema: createVegetableSchema,
    handler: createVegetableHandler,
  });

  // POST /api/vegetables/seed - Seed the database with initial vegetable data
  app.post('/api/vegetables/seed', {
    schema: seedVegetablesSchema,
    handler: async (req, res) => {
      try {
        await seedVegetables();
        res.status(200).send({ message: 'Vegetables seeded successfully' });
      } catch (error: any) {
        console.error('Error seeding vegetables:', error);
        res.status(500).send({ error: 'Failed to seed vegetables' });
      }
    }
  });
}