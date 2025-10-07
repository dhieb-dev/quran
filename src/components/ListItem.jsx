export const ListItem = ({ name, index, handleClick, isMakkia }) => {
  return (
    <div
      onClick={handleClick}
      className="flex justify-between cursor-pointer bg-black/5 hover:bg-white/80 dark:bg-black/80 hover:dark:bg-black/60 py-1 px-2 rounded-md"
    >
      <div className="flex">
        <span className="ml-1">{index} </span>-<h3 className="mr-1"> {name}</h3>
      </div>
      {isMakkia >= 0 && <p>{isMakkia === 1 ? "مكية" : "مدنية"}</p>}
    </div>
  );
};
