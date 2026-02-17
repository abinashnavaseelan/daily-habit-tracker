import React, { useRef, useEffect } from "react";

interface ProgressBarProps {
  completed: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.width = `${percentage}%`;
    }
  }, [percentage]);

  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">Today's Progress</h3>
        <span className="text-2xl font-bold text-primary">
          {completed} / {total}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          ref={barRef}
          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: 0 }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground text-right">{percentage}% completed</p>
    </div>
  );
};

export default ProgressBar;
