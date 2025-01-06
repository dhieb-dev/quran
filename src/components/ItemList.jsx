export const ItemList = ({ item, index, click }) => {
  return (
    <li
      onClick={click}
      className="w-full relative px-4 ease duration-300 py-1.5 mb-1 bg-zinc-50/60 dark:bg-zinc-950/60 group hover:bg-neutral-100 hover:dark:bg-slate-950 border-b-2 border-blue-300 dark:border-gray-900 hover:border-red-200 dark:hover:border-red-100/50"
    >
      <div className="w-8 h-8 rotate-45 rounded bg-blue-300 dark:bg-gray-700 grid place-content-center absolute top-3 right-0 -translate-y-1/2 text-sm font-medium group-hover:bg-blue-400 group-hover:dark:bg-gray-800">
        <span className="-rotate-45">{index + 1}</span>
      </div>
      <div className="ms-7">{item.name}</div>
    </li>
  );
};
