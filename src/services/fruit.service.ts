// Mock data for fruits
const fruits = [
  { id: 1, name: "Apple", color: "Red", category: "Pome" },
  { id: 2, name: "Banana", color: "Yellow", category: "Berry" },
  { id: 3, name: "Orange", color: "Orange", category: "Citrus" },
  { id: 4, name: "Grape", color: "Purple", category: "Berry" },
  { id: 5, name: "Strawberry", color: "Red", category: "Berry" },
  { id: 6, name: "Lemon", color: "Yellow", category: "Citrus" },
  { id: 7, name: "Mango", color: "Orange", category: "Drupe" },
  { id: 8, name: "Blueberry", color: "Blue", category: "Berry" },
  { id: 9, name: "Pineapple", color: "Yellow", category: "Multiple" },
  { id: 10, name: "Watermelon", color: "Green", category: "Pepo" },
];

export async function getAllFruits() {
  console.log('Fetching all fruits from array');
  return fruits;
}

export async function getFruitById(id: number) {
  console.log(`Fetching fruit with id: ${id}`);
  const fruit = fruits.find(f => f.id === id);
  
  if (!fruit) {
    throw new Error(`Fruit with id ${id} not found`);
  }
  
  return fruit;
}