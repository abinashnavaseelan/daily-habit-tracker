import React from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No habits found",
  description = "Create some habits in the backend or adjust your filters.",
}) => {
  return (
    <div className="glass-card flex flex-col items-center justify-center py-16 text-center">
      <Inbox className="mb-4 h-16 w-16 text-muted-foreground/50" />
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default EmptyState;
