import { minMax } from "../svgs/minmax"
export const MinMax = ({ signal, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-7 h-7">
      {signal ? minMax.minimize : minMax.maximize}
    </button>
  );
};