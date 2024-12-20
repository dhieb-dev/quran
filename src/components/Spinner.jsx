const arrSpinner = [1, 2, 3, 4, 5, 6];
export const Spinner = () => {
  return (
    <div className="space-y-4 my-4">
      {arrSpinner.map((el) => (
        <div
          key={el}
          className="h-10 w-full bg-gradient-to-l from-gray-300 to:bg-gray-100 dark:from-zinc-950 dark:to-zinc-800 animate-pulse"
        />
      ))}
    </div>
  );
};
