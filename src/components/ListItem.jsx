export const ListItem = ({ name, index, handleClick, isMakkia }) => {
  return (
    <div
      onClick={handleClick}
      className="flex justify-between cursor-pointer bg-sky-50 dark:bg-neutral-900 py-1 px-2 rounded-md shadow-md dark:shadow-white/10"
    >
      <div>
        <span>{index} </span>-<span> {name}</span>
      </div>
      {isMakkia < 2 && <span>{isMakkia ? "مكية" : "مدنية"}</span>}
    </div>
  );
};
