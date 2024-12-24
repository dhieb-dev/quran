export const ItemList = ({ item, index, click }) => {
  return (
    <li
      onClick={click}
      className="w-full relative px-4 ease duration-300 py-1.5 mb-1 bg-gradient-to-l from-slate-50/80 to-blue-100/90 dark:from-neutral-950 dark:to-gray-900 group hover:to-slate-100 hover:dark:to-neutral-900 rounded shadow-sm shadow-slate-950/50 dark:shadow-slate-400/50"
    >
      <div className="w-10 h-10 rounded-md bg-blue-300 dark:bg-gray-700 grid place-content-center absolute top-1/2 -right-2 -translate-y-1/2 text-sm font-medium group-hover:bg-blue-400 group-hover:dark:bg-gray-800">
        {index + 1}
      </div>
      <div className="ms-7">{item.name}</div>
    </li>
  );
};
