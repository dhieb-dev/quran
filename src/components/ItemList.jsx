import { useElementInView } from '../hooks';

export const ItemList = ({ item, index, click }) => {
  const { targetRef } = useElementInView()
  return (
    <li
      ref={el => targetRef.current[index] = el}
      onClick={click}
      className="px-4 ease duration-300 py-2 mb-1 w-full flex bg-gradient-to-r from-slate-200/70 to-gray-200/70 dark:from-neutral-900/60 dark:to-gray-800/70 border-r-4 border-sky-400 hover:border-gray-800 hover:to-green-100 hover:dark:border-green-100 hover:dark:to-neutral-950"
    >
      <span className="">{index + 1} -</span>
      <span className="mx-4">{item.name}</span>
    </li>
  );
};
