const effectLoding = [
  { delay: { animationDelay: 0 } },
  { delay: { animationDelay: 150 + "ms" } },
  { delay: { animationDelay: 300 + "ms" } },
];
export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-40">
      {effectLoding.map(({ delay }, index) => (
        <div
          key={index}
          className="h-3 w-3 mx-3 bg-slate-700 dark:bg-slate-200 rounded-full animate-ping grid place-content-center"
          style={delay}
        ></div>
      ))}
    </div>
  );
};
