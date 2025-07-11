import { db } from '../db/client';
import { vegetables } from '../db/schema';
import { eq } from 'drizzle-orm';
import { AppError } from '../utils/AppError';

export async function getAllVegetables() {
  console.log('Fetching all vegetables from database');
  
  const result = await db
    .select({
      id: vegetables.id,
      name: vegetables.name,
      color: vegetables.color,
      category: vegetables.category,
    })
    .from(vegetables);
  
  return result;
}

export async function getVegetableById(id: number) {
  console.log(`Fetching vegetable with id: ${id} from database`);
  
  const result = await db
    .select({
      id: vegetables.id,
      name: vegetables.name,
      color: vegetables.color,
      category: vegetables.category,
    })
    .from(vegetables)
    .where(eq(vegetables.id, id));
  
  if (result.length === 0) {
    throw new AppError(`Vegetable with id ${id} not found`, 404);
  }
  
  return result[0];
}

export async function createVegetable({
  name,
  color,
  category,
}: {
  name: string;
  color: string;
  category: string;
}) {
  console.log(`Creating new vegetable: ${name}`);
  
  try {
    const result = await db
      .insert(vegetables)
      .values({ name, color, category })
      .returning({
        id: vegetables.id,
        name: vegetables.name,
        color: vegetables.color,
        category: vegetables.category,
      });
    
    return result[0];
  } catch (error: any) {
    console.error('Error creating vegetable:', error);
    throw new AppError('Failed to create vegetable', 500);
  }
}

// Helper function to seed the database with initial data
export async function seedVegetables() {
  console.log('Seeding vegetables table with initial data');
  
  const initialVegetables = [
    { name: "Carrot", color: "Orange", category: "Root" },
    { name: "Broccoli", color: "Green", category: "Cruciferous" },
    { name: "Tomato", color: "Red", category: "Nightshade" },
    { name: "Spinach", color: "Green", category: "Leafy" },
    { name: "Bell Pepper", color: "Red", category: "Nightshade" },
    { name: "Onion", color: "White", category: "Bulb" },
    { name: "Potato", color: "Brown", category: "Tuber" },
    { name: "Lettuce", color: "Green", category: "Leafy" },
    { name: "Cucumber", color: "Green", category: "Gourd" },
    { name: "Corn", color: "Yellow", category: "Grain" },
  ];

  // Check if vegetables already exist
  const existingVegetables = await db.select().from(vegetables).limit(1);
  
  if (existingVegetables.length === 0) {
    await db.insert(vegetables).values(initialVegetables);
    console.log('Vegetables seeded successfully');
  } else {
    console.log('Vegetables already exist, skipping seed');
  }
}