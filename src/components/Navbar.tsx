import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, LayoutDashboard, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="glass-strong sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-gradient">HabitFlow</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          {isAdmin && (
            <Link to="/admin">
              <Button
                variant={isActive("/admin") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Shield className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          )}

          <ThemeToggle />

          <div className="ml-2 flex items-center gap-3 border-l border-border pl-4">
            <span className="text-sm text-muted-foreground">
              {user?.name}
            </span>
            <Button variant="ghost" size="icon" onClick={logout} aria-label="Logout">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
