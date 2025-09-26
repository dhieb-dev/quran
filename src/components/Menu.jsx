export const Menu = ({ onclick, ref }) => {
  return (
    <button
      ref={ref}
      onClick={onclick}
      className="menu w-9 h-8 flex flex-col justify-between bg-slate-200 dark:bg-slate-800 rounded-md p-1.5"
    >
      <span className="block w-full h-1 rounded-md bg-zinc-600 dark:bg-zinc-200 pointer-events-none" />
      <span className="block w-full h-1 rounded-md bg-zinc-600 dark:bg-zinc-200 pointer-events-none" />
      <span className="block w-full h-1 rounded-md bg-zinc-600 dark:bg-zinc-200 pointer-events-none" />
    </button>
  );
};
