import { useElementInView } from '../hooks';

export const ItemList = ({ index, item, click, dataAttributes }) => {
  const { targetRef } = useElementInView()
  return (
    <button
      ref={el => targetRef.current[index] = el}
      onClick={click}
      className="px-4 ease duration-500 py-2 mb-2 w-full flex hover:bg-gray-100 dark:hover:bg-gray-700 rounded rounded-es-none rounded-ee-none border-b-2 border-teal-200 dark:border-blue-400"
      {...Object.keys(dataAttributes).reduce((acc, key) => {
        acc[`data-${key}`] = dataAttributes[key];
        return acc;
      }, {})}
    >
      <span className="font-bold">{index + 1} -</span>
      <span className="mx-4">{item.name}</span>
    </button>
  );
};
