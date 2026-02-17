import type { User, Habit, AuthResponse } from "@/types";

export const MOCK_ADMIN: User = {
  id: "mock-admin-001",
  _id: "mock-admin-001",
  name: "Admin User",
  email: "admin@demo.com",
  age: 30,
  role: "admin",
  createdAt: new Date().toISOString(),
};

export const MOCK_USER: User = {
  id: "mock-user-001",
  _id: "mock-user-001",
  name: "Demo User",
  email: "user@demo.com",
  age: 25,
  role: "user",
  createdAt: new Date().toISOString(),
};

export const MOCK_USERS: User[] = [MOCK_ADMIN, MOCK_USER];

export const MOCK_HABITS: Habit[] = [
  {
    _id: "mock-habit-1",
    name: "Morning Meditation",
    price: 2,
    description: "10 minutes of mindful breathing every morning",
    stock: 7,
    category: "Mindfulness",
  },
  {
    _id: "mock-habit-2",
    name: "Exercise",
    price: 4,
    description: "30 minutes of physical activity",
    stock: 5,
    category: "Health",
  },
  {
    _id: "mock-habit-3",
    name: "Read a Book",
    price: 1,
    description: "Read at least 20 pages daily",
    stock: 7,
    category: "Learning",
  },
  {
    _id: "mock-habit-4",
    name: "Drink Water",
    price: 1,
    description: "Drink 8 glasses of water throughout the day",
    stock: 7,
    category: "Health",
  },
  {
    _id: "mock-habit-5",
    name: "Journal Writing",
    price: 2,
    description: "Write a reflective journal entry before bed",
    stock: 5,
    category: "Mindfulness",
  },
  {
    _id: "mock-habit-6",
    name: "Learn a New Skill",
    price: 5,
    description: "Spend 1 hour practicing a new skill or language",
    stock: 3,
    category: "Learning",
  },
];

export const MOCK_ACCOUNTS: Record<string, { password: string; user: User }> = {
  "admin@demo.com": { password: "admin123", user: MOCK_ADMIN },
  "user@demo.com": { password: "user1234", user: MOCK_USER },
};

export function mockLogin(email: string, password: string): AuthResponse {
  const account = MOCK_ACCOUNTS[email];
  if (!account || account.password !== password) {
    throw new Error("Invalid email or password");
  }
  return { token: "mock-token-" + Date.now(), user: account.user };
}

export function mockRegister(name: string, email: string, age: number): AuthResponse {
  const user: User = {
    id: "mock-" + Date.now(),
    _id: "mock-" + Date.now(),
    name,
    email,
    age,
    role: "user",
    createdAt: new Date().toISOString(),
  };
  return { token: "mock-token-" + Date.now(), user };
}
