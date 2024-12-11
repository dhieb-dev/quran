import { useElementInView } from "../hooks";

export const ItemList = ({ item, index, click }) => {
  const { targetRef } = useElementInView();
  return (
    <li
      ref={(el) => (targetRef.current[index] = el)}
      onClick={click}
      className="px-4 ease duration-300 py-2 mb-1 w-full flex bg-gradient-to-r from-slate-50 to-blue-100 dark:from-neutral-900 dark:to-gray-900 border-r-4 border-sky-400 hover:border-slate-100"
    >
      <span className="">{index + 1} -</span>
      <span className="mx-4">{item.name}</span>
    </li>
  );
};
