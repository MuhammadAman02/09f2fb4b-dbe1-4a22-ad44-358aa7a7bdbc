import { db } from '../db/client';
import { fruits } from '../db/schema';
import { eq } from 'drizzle-orm';

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
    throw new Error(`Fruit with id ${id} not found`);
  }
  
  return result[0];
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