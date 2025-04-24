import React from "react";

export const Loading = () => {
  return (
    <div className="space-y-2 animate-softVision">
      {new Array(12).fill().map((_, index) => (
        <div
          key={index}
          style={{ animationDelay: `${index}.0ms` }}
          className="h-7 bg-sky-100 dark:bg-neutral-800 py-1 px-2 rounded-md shadow-md dark:shadow-white/10 animate-pulse"
        />
      ))}
    </div>
  );
};
