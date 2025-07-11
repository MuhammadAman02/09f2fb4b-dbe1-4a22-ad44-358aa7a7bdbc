import { db } from '../db/client';
import { fruits } from '../db/schema';
import { eq } from 'drizzle-orm';
import { AppError } from '../utils/AppError';

export async function getAllFruits() {
  console.log('Fetching all fruits from database');
  
  const result = await db
    .select({
      id: fruits.id,
      name: fruits.name,
      color: fruits.color,
      category: fruits.category,
    })
    .from(fruits);
  
  return result;
}

export async function getFruitById(id: number) {
  console.log(`Fetching fruit with id: ${id} from database`);
  
  const result = await db
    .select({
      id: fruits.id,
      name: fruits.name,
      color: fruits.color,
      category: fruits.category,
    })
    .from(fruits)
    .where(eq(fruits.id, id));
  
  if (result.length === 0) {
    throw new AppError(`Fruit with id ${id} not found`, 404);
  }
  
  return result[0];
}

export async function createFruit({
  name,
  color,
  category,
}: {
  name: string;
  color: string;
  category: string;
}) {
  console.log(`Creating new fruit: ${name}`);
  
  try {
    const result = await db
      .insert(fruits)
      .values({ name, color, category })
      .returning({
        id: fruits.id,
        name: fruits.name,
        color: fruits.color,
        category: fruits.category,
      });
    
    return result[0];
  } catch (error: any) {
    console.error('Error creating fruit:', error);
    throw new AppError('Failed to create fruit', 500);
  }
}

// Helper function to seed the database with initial data
export async function seedFruits() {
  console.log('Seeding fruits table with initial data');
  
  const initialFruits = [
    { name: "Apple", color: "Red", category: "Pome" },
    { name: "Banana", color: "Yellow", category: "Berry" },
    { name: "Orange", color: "Orange", category: "Citrus" },
    { name: "Grape", color: "Purple", category: "Berry" },
    { name: "Strawberry", color: "Red", category: "Berry" },
    { name: "Lemon", color: "Yellow", category: "Citrus" },
    { name: "Mango", color: "Orange", category: "Drupe" },
    { name: "Blueberry", color: "Blue", category: "Berry" },
    { name: "Pineapple", color: "Yellow", category: "Multiple" },
    { name: "Watermelon", color: "Green", category: "Pepo" },
  ];

  // Check if fruits already exist
  const existingFruits = await db.select().from(fruits).limit(1);
  
  if (existingFruits.length === 0) {
    await db.insert(fruits).values(initialFruits);
    console.log('Fruits seeded successfully');
  } else {
    console.log('Fruits already exist, skipping seed');
  }
}