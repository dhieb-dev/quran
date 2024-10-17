import { forwardRef } from 'react';

export const ItemList = forwardRef(({ index, item, click, dataAttributes }, ref) => {
  return (
    <button
      ref={ref}
      onClick={click}
      className="px-4 ease duration-500 py-2 mb-2 w-full flex bg-gray-100 dark:bg-neutral-900 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
      {...Object.keys(dataAttributes).reduce((acc, key) => {
        acc[`data-${key}`] = dataAttributes[key];
        return acc;
      }, {})}
    >
      <span className="font-bold">{index + 1} -</span>
      <span className="mx-4">{item.name}</span>
    </button>
  );
});
