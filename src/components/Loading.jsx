export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-100 dark:bg-neutral-950 grid place-content-center">
      <div className="flex space-x-2 space-x-reverse">
        {[0.5, 0.75, 1].map((dot, index) => (
          <span
            key={index}
            style={{ animationDuration: dot + "s" }}
            className="size-3 rounded-full bg-slate-500 dark:bg-slate-300 animate-bounce"
          />
        ))}
      </div>
    </div>
  );
};
