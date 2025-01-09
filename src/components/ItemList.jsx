import { downlod } from "../svgs/download";

export const ItemList = ({ item, index, click, download }) => {
  return (
    <li className="w-full relative flex items-center bg-primary hover:bg-main group border-b-2 border-third hover:border-fourth">
     div 
        onClick={click}
        className="flex-1 flex items-center px-4 duration-300"
      >
        <span className="w-7 h-7 ml-4 mb-2 rotate-45 rounded bg-third grid place-content-center text-sm font-medium group-hover:bg-fourth">
          <span className="-rotate-45">{index + 1}</span>
        </span>
        <p>{item.name}</p>
      </div>
      {download && (
        <button className="px-2" onClick={download}>
          {downlod.downlod}
        </button>
      )}
    </li>
  );
};
