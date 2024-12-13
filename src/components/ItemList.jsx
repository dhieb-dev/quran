import { useElementInView } from "../hooks";

export const ItemList = ({ item, index, click }) => {
  const { targetRef } = useElementInView();
  return (
    <li
      ref={(el) => (targetRef.current[index] = el)}
      onClick={click}
      className="relative z-[0] px-4 ease duration-300 py-2 mb-1 w-full flex bg-gradient-to-l from-slate-50/50 to-blue-100/50 dark:from-neutral-950 dark:to-gray-900 hover:to-slate-100 hover:dark:to-neutral-900 border-r-4 border-sky-400 hover:border-red-300 hover:dark:border-slate-100 rounded shadow-sm shadow-slate-950/50 dark:shadow-slate-400/50"
    >
      <span className="">{index + 1} -</span>
      <span className="mx-4">{item.name}</span>
    </li>
  );
};
