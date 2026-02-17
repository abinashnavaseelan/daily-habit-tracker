import React, { useMemo } from "react";
import { useHabits } from "@/context/HabitContext";
import ProgressBar from "@/components/ProgressBar";
import HabitCard from "@/components/HabitCard";
import FilterBar from "@/components/FilterBar";
import EmptyState from "@/components/EmptyState";
import Navbar from "@/components/Navbar";

const Dashboard: React.FC = () => {
  const {
    habits,
    isLoading,
    error,
    filters,
    setFilters,
    toggleHabitLog,
    isHabitDoneToday,
    completedCount,
    totalCount,
  } = useHabits();

  const categories = useMemo(
    () => [...new Set(habits.map((h) => h.category).filter(Boolean))],
    [habits]
  );

  // Client-side search filtering (in addition to server-side)
  const filteredHabits = useMemo(() => {
    let result = habits;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [habits, filters.search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Your Habits</h1>
          <p className="mt-1 text-muted-foreground">
            Track your daily progress and build consistency.
          </p>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <ProgressBar completed={completedCount} total={totalCount} />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            categories={categories}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <div className="glass-card text-center">
            <p className="text-destructive">{error}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Make sure your backend is running at the configured API URL.
            </p>
          </div>
        ) : filteredHabits.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHabits.map((habit, i) => (
              <div
                key={habit._id}
                className="animate-fade-in"
                style={{ animationDelay: `${0.3 + i * 0.05}s` }}
              >
                <HabitCard
                  habit={habit}
                  isDone={isHabitDoneToday(habit._id)}
                  onToggle={toggleHabitLog}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
