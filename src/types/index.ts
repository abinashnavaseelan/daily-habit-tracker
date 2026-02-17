export type UserRole = "user" | "admin";

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  age: number;
  role?: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Habit {
  _id: string;
  name: string;
  price: number; // mapped as difficulty (1-5)
  description: string;
  stock: number; // mapped as frequency target
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HabitLog {
  habitId: string;
  date: string; // YYYY-MM-DD
  completed: boolean;
}

export type Frequency = "daily" | "weekly" | "monthly";
export type Difficulty = "easy" | "medium" | "hard";

export interface HabitFilters {
  category?: string;
  search?: string;
  sort?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  age: number;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
