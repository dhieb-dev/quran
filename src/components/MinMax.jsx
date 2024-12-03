import { minMax } from "../svgs/minmax"
export const MinMax = ({ signal, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6">
      {signal ? minMax.minimize : minMax.maximize}
    </button>
  );
};