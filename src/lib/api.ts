import axios from "axios";
import type { AuthResponse, Habit, HabitFilters, LoginData, RegisterData, User } from "@/types";
import { MOCK_HABITS, MOCK_USERS, mockLogin, mockRegister } from "./mock-data";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

let useMockMode = false;

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function enableMockMode() {
  if (!useMockMode) {
    useMockMode = true;
    console.info("⚡ Backend unreachable — running in demo mode");
  }
}

// Auth
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    if (useMockMode) throw new Error("mock");
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch {
    enableMockMode();
    return mockLogin(data.email, data.password);
  }
};

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    if (useMockMode) throw new Error("mock");
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch {
    enableMockMode();
    return mockRegister(data.name, data.email, data.age);
  }
};

// Habits (products in the backend)
export const getHabits = async (filters?: HabitFilters): Promise<Habit[]> => {
  try {
    if (useMockMode) throw new Error("mock");
    const params: Record<string, string> = {};
    if (filters?.category) params.category = filters.category;
    if (filters?.search) params.search = filters.search;
    if (filters?.sort) params.sort = filters.sort;
    const res = await api.get("/products", { params });
    return res.data.products || res.data;
  } catch {
    enableMockMode();
    let habits = [...MOCK_HABITS];
    if (filters?.category) habits = habits.filter((h) => h.category === filters.category);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      habits = habits.filter((h) => h.name.toLowerCase().includes(q) || h.description.toLowerCase().includes(q));
    }
    return habits;
  }
};

export const createHabit = async (habit: Omit<Habit, "_id">): Promise<Habit> => {
  try {
    if (useMockMode) throw new Error("mock");
    const res = await api.post("/products", habit);
    return res.data;
  } catch {
    enableMockMode();
    return { ...habit, _id: "mock-" + Date.now() };
  }
};

export const deleteHabit = async (id: string): Promise<void> => {
  try {
    if (useMockMode) throw new Error("mock");
    await api.delete(`/products/${id}`);
  } catch {
    enableMockMode();
  }
};

// Users (admin only)
export const getUsers = async (): Promise<User[]> => {
  try {
    if (useMockMode) throw new Error("mock");
    const res = await api.get("/users");
    return res.data;
  } catch {
    enableMockMode();
    return MOCK_USERS;
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    if (useMockMode) throw new Error("mock");
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch {
    enableMockMode();
    return MOCK_USERS.find((u) => u.id === id || u._id === id) || MOCK_USERS[0];
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    if (useMockMode) throw new Error("mock");
    await api.delete(`/users/${id}`);
  } catch {
    enableMockMode();
  }
};

export default api;
