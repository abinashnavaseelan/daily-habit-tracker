import React, { useEffect, useState } from "react";
import { Users, Activity, Trash2 } from "lucide-react";
import { getUsers, deleteUser, getHabits } from "@/lib/api";
import type { User, Habit } from "@/types";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, habitsData] = await Promise.all([
          getUsers(),
          getHabits(),
        ]);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setHabits(Array.isArray(habitsData) ? habitsData : []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="mt-1 text-muted-foreground">
            Manage users and view habit statistics.
          </p>
        </div>

        {error && (
          <div className="glass-card bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="glass-card flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
              <div className="glass-card flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{habits.length}</p>
                  <p className="text-sm text-muted-foreground">Total Habits</p>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Users</h2>
              {users.length === 0 ? (
                <p className="text-muted-foreground text-sm">No users found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Age</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id || user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 text-foreground">{user.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                          <td className="px-4 py-3 text-muted-foreground">{user.age}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-primary/10 text-primary"
                                : "bg-secondary text-secondary-foreground"
                            }`}>
                              {user.role || "user"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteUser(user._id || user.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Habits Overview */}
            <div className="glass-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <h2 className="mb-4 text-lg font-semibold text-foreground">All Habits</h2>
              {habits.length === 0 ? (
                <p className="text-muted-foreground text-sm">No habits found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Difficulty</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {habits.map((habit) => (
                        <tr key={habit._id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 text-foreground">{habit.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{habit.category}</td>
                          <td className="px-4 py-3 text-muted-foreground">{habit.price}</td>
                          <td className="px-4 py-3 text-muted-foreground">{habit.stock}x</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Admin;
