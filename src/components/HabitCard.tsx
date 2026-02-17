import React from "react";
import { Check, Flame, Zap, Trophy } from "lucide-react";
import type { Habit } from "@/types";

interface HabitCardProps {
  habit: Habit;
  isDone: boolean;
  onToggle: (id: string) => void;
}

const difficultyLabel = (price: number): string => {
  if (price <= 2) return "Easy";
  if (price <= 4) return "Medium";
  return "Hard";
};

const difficultyIcon = (price: number) => {
  if (price <= 2) return <Zap className="h-3.5 w-3.5" />;
  if (price <= 4) return <Flame className="h-3.5 w-3.5" />;
  return <Trophy className="h-3.5 w-3.5" />;
};

const HabitCard: React.FC<HabitCardProps> = ({ habit, isDone, onToggle }) => {
  return (
    <div
      className={`glass-card group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        isDone ? "border-success/40 glow" : ""
      }`}
      onClick={() => onToggle(habit._id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onToggle(habit._id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className={`text-base font-semibold transition-colors ${
              isDone ? "text-success line-through" : "text-foreground"
            }`}
          >
            {habit.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {habit.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {habit.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
              {difficultyIcon(habit.price)}
              {difficultyLabel(habit.price)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              Target: {habit.stock}x
            </span>
          </div>
        </div>

        <div
          className={`ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
            isDone
              ? "border-success bg-success"
              : "border-border group-hover:border-primary"
          }`}
        >
          {isDone && <Check className="h-5 w-5 text-success-foreground" />}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
