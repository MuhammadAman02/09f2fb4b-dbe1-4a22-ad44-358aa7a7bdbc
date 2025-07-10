import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const FruitZod = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  category: z.string(),
});

const CreateFruitZod = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
  category: z.string().min(1, "Category is required"),
});

const GetFruitsResponseZod = z.array(FruitZod);
const GetFruitByIdResponseZod = FruitZod;
const CreateFruitResponseZod = FruitZod;

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

export const createFruitSchema = {
  tags: ["Fruits"],
  body: zodToJsonSchema(CreateFruitZod),
  response: {
    201: zodToJsonSchema(CreateFruitResponseZod),
    400: zodToJsonSchema(z.object({
      error: z.string(),
    })),
  },
};

export const seedFruitsSchema = {
  tags: ["Fruits"],
  summary: "Seed database with initial fruit data",
  description: "Populates the fruits table with 10 sample fruits if the table is empty",
  response: {
    200: zodToJsonSchema(z.object({
      message: z.string(),
    })),
    500: zodToJsonSchema(z.object({
      error: z.string(),
    })),
  },
};