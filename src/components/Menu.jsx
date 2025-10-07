export const Menu = ({ onclick, ref }) => {
  return (
    <button
      ref={ref}
      onClick={onclick}
      className="menu w-9 h-8 flex flex-col justify-between bg-gray-200 dark:bg-neutral-800 rounded-md p-1.5"
    >
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="w-full h-1 rounded-md bg-zinc-600 dark:bg-zinc-200 pointer-events-none"
        />
      ))}
    </button>
  );
};
