import { useFetch } from "../hooks/index";
import { ListItem, Loading } from "./index";

export const ListSurahs = ({ setIdSurah }) => {
  const { data, loading } = useFetch("https://www.mp3quran.net/api/v3/suwar");
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {data?.suwar.map((item, index) => (
            <ListItem
              key={index}
              index={item.id}
              name={item.name}
              handleClick={() => setIdSurah(item.id)}
              isMakkia={item.makkia}
            />
          ))}
        </div>
      )}
    </>
  );
};
