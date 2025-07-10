import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const FruitZod = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  category: z.string(),
});

const GetFruitsResponseZod = z.array(FruitZod);

const GetFruitByIdResponseZod = FruitZod;

// Fastify-compatible JSON schemas
export const getFruitsSchema = {
  tags: ["Fruits"],
  response: {
    200: zodToJsonSchema(GetFruitsResponseZod),
  },
};

export const getFruitByIdSchema = {
  tags: ["Fruits"],
  params: zodToJsonSchema(z.object({
    id: z.coerce.number().int().positive(),
  })),
  response: {
    200: zodToJsonSchema(GetFruitByIdResponseZod),
    404: zodToJsonSchema(z.object({
      error: z.string(),
    })),
  },
};