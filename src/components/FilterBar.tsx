import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { HabitFilters } from "@/types";

interface FilterBarProps {
  filters: HabitFilters;
  onFilterChange: (filters: HabitFilters) => void;
  categories: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, categories }) => {
  return (
    <div className="glass-card flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search habits..."
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-9 bg-muted/50 border-border"
        />
      </div>

      <Select
        value={filters.category || "all"}
        onValueChange={(val) =>
          onFilterChange({ ...filters, category: val === "all" ? undefined : val })
        }
      >
        <SelectTrigger className="w-full sm:w-40 bg-muted/50">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.sort || "name"}
        onValueChange={(val) => onFilterChange({ ...filters, sort: val })}
      >
        <SelectTrigger className="w-full sm:w-40 bg-muted/50">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="-price">Difficulty ↓</SelectItem>
          <SelectItem value="price">Difficulty ↑</SelectItem>
          <SelectItem value="category">Category</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
