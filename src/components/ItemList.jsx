import { useElementInView } from '../hooks';

export const ItemList = ({ item, index, click }) => {
  const { targetRef } = useElementInView()
  return (
    <li
      ref={el => targetRef.current[index] = el}
      onClick={click}
      className="px-4 ease duration-300 py-2 mb-1 w-full flex rounded bg-gradient-to-r from-slate-100 to-gray-100 dark:from-neutral-900 dark:to-gray-900 border border-transparent hover:border-gray-800 hover:to-neutral-50 hover:dark:border-green-100 hover:dark:to-neutral-950"
    >
      <span className="font-bold">{index + 1} -</span>
      <span className="mx-4">{item.name}</span>
    </li>
  );
};
