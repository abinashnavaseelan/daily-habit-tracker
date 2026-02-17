import React, { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from "react";
import type { Habit, HabitLog, HabitFilters } from "@/types";
import { getHabits } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface HabitState {
  habits: Habit[];
  logs: HabitLog[];
  filters: HabitFilters;
  isLoading: boolean;
  error: string | null;
}

type HabitAction =
  | { type: "SET_HABITS"; payload: Habit[] }
  | { type: "TOGGLE_LOG"; payload: { habitId: string; date: string } }
  | { type: "SET_FILTERS"; payload: HabitFilters }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: HabitState = {
  habits: [],
  logs: JSON.parse(localStorage.getItem("habitLogs") || "[]"),
  filters: {},
  isLoading: false,
  error: null,
};

function habitReducer(state: HabitState, action: HabitAction): HabitState {
  switch (action.type) {
    case "SET_HABITS":
      return { ...state, habits: action.payload, isLoading: false, error: null };
    case "TOGGLE_LOG": {
      const { habitId, date } = action.payload;
      const existing = state.logs.find((l) => l.habitId === habitId && l.date === date);
      let newLogs: HabitLog[];
      if (existing) {
        newLogs = state.logs.filter((l) => !(l.habitId === habitId && l.date === date));
      } else {
        newLogs = [...state.logs, { habitId, date, completed: true }];
      }
      localStorage.setItem("habitLogs", JSON.stringify(newLogs));
      return { ...state, logs: newLogs };
    }
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

interface HabitContextType extends HabitState {
  toggleHabitLog: (habitId: string) => void;
  setFilters: (filters: HabitFilters) => void;
  refreshHabits: () => Promise<void>;
  isHabitDoneToday: (habitId: string) => boolean;
  completedCount: number;
  totalCount: number;
}

const HabitContext = createContext<HabitContextType | null>(null);

const getTodayStr = () => new Date().toISOString().split("T")[0];

export const HabitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(habitReducer, initialState);
  const { isAuthenticated } = useAuth();

  const refreshHabits = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const habits = await getHabits(state.filters);
      dispatch({ type: "SET_HABITS", payload: Array.isArray(habits) ? habits : [] });
    } catch (err: any) {
      dispatch({ type: "SET_ERROR", payload: err.message || "Failed to load habits" });
    }
  }, [state.filters]);

  useEffect(() => {
    if (isAuthenticated) {
      refreshHabits();
    }
  }, [isAuthenticated, refreshHabits]);

  const isHabitDoneToday = (habitId: string) => {
    const today = getTodayStr();
    return state.logs.some((l) => l.habitId === habitId && l.date === today && l.completed);
  };

  const toggleHabitLog = (habitId: string) => {
    const today = getTodayStr();
    dispatch({ type: "TOGGLE_LOG", payload: { habitId, date: today } });
  };

  const setFilters = (filters: HabitFilters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  };

  const completedCount = state.habits.filter((h) => isHabitDoneToday(h._id)).length;
  const totalCount = state.habits.length;

  return (
    <HabitContext.Provider
      value={{
        ...state,
        toggleHabitLog,
        setFilters,
        refreshHabits,
        isHabitDoneToday,
        completedCount,
        totalCount,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) throw new Error("useHabits must be used within a HabitProvider");
  return context;
};
