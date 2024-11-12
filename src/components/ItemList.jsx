import { useElementInView } from '../hooks';

export const ItemList = ({ item, index, click }) => {
  const { targetRef } = useElementInView()
  return (
    <li
      ref={el => targetRef.current[index] = el}
      onClick={click}
      className="px-4 ease duration-300 py-2 mb-2 w-full flex hover:bg-gray-100 dark:hover:bg-gray-700 rounded rounded-es-none rounded-ee-none border-b-2 border-teal-200 dark:border-blue-400"
    >
      <span className="font-bold">{index + 1} -</span>
      <span className="mx-4">{item.name}</span>
    </li>
  );
};
