import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const VegetableZod = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  category: z.string(),
});

const CreateVegetableZod = z.object({
  name: z.string().min(1, "Name is required"),
  color: z.string().min(1, "Color is required"),
  category: z.string().min(1, "Category is required"),
});

const GetVegetablesResponseZod = z.array(VegetableZod);
const GetVegetableByIdResponseZod = VegetableZod;
const CreateVegetableResponseZod = VegetableZod;

// Fastify-compatible JSON schemas
export const getVegetablesSchema = {
  tags: ["Vegetables"],
  response: {
    200: zodToJsonSchema(GetVegetablesResponseZod),
  },
};

export const getVegetableByIdSchema = {
  tags: ["Vegetables"],
  params: zodToJsonSchema(z.object({
    id: z.coerce.number().int().positive(),
  })),
  response: {
    200: zodToJsonSchema(GetVegetableByIdResponseZod),
    404: zodToJsonSchema(z.object({
      error: z.string(),
    })),
  },
};

export const createVegetableSchema = {
  tags: ["Vegetables"],
  body: zodToJsonSchema(CreateVegetableZod),
  response: {
    201: zodToJsonSchema(CreateVegetableResponseZod),
    400: zodToJsonSchema(z.object({
      error: z.string(),
    })),
  },
};

export const seedVegetablesSchema = {
  tags: ["Vegetables"],
  summary: "Seed database with initial vegetable data",
  description: "Populates the vegetables table with 10 sample vegetables if the table is empty",
  response: {
    200: zodToJsonSchema(z.object({
      message: z.string(),
    })),
    500: zodToJsonSchema(z.object({
      error: z.string(),
    })),
  },
};