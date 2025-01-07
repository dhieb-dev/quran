import { downlod } from "../svgs/download";

export const ItemList = ({ item, index, click, download }) => {
  return (
    <li className="w-full relative flex items-center bg-zinc-50/60 dark:bg-zinc-950/60 group hover:bg-neutral-100 hover:dark:bg-slate-950 border-b-2 border-blue-300 dark:border-gray-900 hover:border-red-200 dark:hover:border-red-100/50">
      <button
        onClick={click}
        className="flex-1 flex items-center px-4 duration-300"
      >
        <span className="w-7 h-7 ml-4 mb-2 rotate-45 rounded bg-blue-300 dark:bg-gray-700 grid place-content-center text-sm font-medium group-hover:bg-blue-400 group-hover:dark:bg-gray-800">
          <span className="-rotate-45">{index + 1}</span>
        </span>
        <p>{item.name}</p>
      </button>
      {download && (
        <button className="px-2" onClick={download}>
          {downlod.downlod}
        </button>
      )}
    </li>
  );
};
