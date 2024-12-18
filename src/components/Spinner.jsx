import "./Spinner.css";
const arrSpinner = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const Spinner = () => {
  return (
    <div className=" relative grid place-content-center h-40">
      <div className="spinner absolute top-1/2 left-1/2 translate-y-1/2 -translate-x-1/2 w-2 h-2">
        {arrSpinner.map((el) => (
          <div key={el} className="absolute w-1/2 h-[150%] bg-zinc-800 dark:bg-zinc-200"></div>
        ))}
      </div>
    </div>
  );
};
