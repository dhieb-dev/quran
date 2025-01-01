const arrSpinner = [75, 100, 200];
export const Spinner = () => {
  return (
    <div className="space-x-4 space-x-reverse h-16 flex justify-center items-center">
      {arrSpinner.map((delay) => (
        <div
          key={delay}
          className={`duration-${delay} w-6 h-6 rounded-full bg-slate-300 dark:bg-zinc-700 animate-pulse`}
        />
      ))}
    </div>
  );
};
