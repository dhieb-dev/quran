const arrSpinner = [75, 100, 200, 300, 500];
export const Spinner = () => {
  return (
    <div className="space-y-4 my-4">
      {arrSpinner.map((el) => (
        <div
          key={el}
          className={` duration-${el} du h-10 w-full bg-gradient-to-l from-zinc-300 to-transparent dark:from-zinc-900 dark:to-transparent animate-pulse`}
        />
      ))}
    </div>
  );
};
