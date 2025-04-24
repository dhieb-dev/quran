import { useFetch } from "../hooks/index";
import { ListItem, Loading } from "../components/index";
import { useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router";

export const Reciters = ({ setNameReciter }) => {
  const { data, loading } = useFetch("reciters");
  const { setReciterData } = useContext(Context);
  const navigate = useNavigate();
  const handleClick = (name, moshaf) => {
    setReciterData({ moshaf });
    setNameReciter(name);
    navigate("surahs");
  };
  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex justify-between [&_p]:underline pb-2">
            <p>إختر القارئ</p>
            <p>{data?.reciters.length} القارئ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 animate-softVision">
            {data?.reciters.map((reciter, index) => (
              <ListItem
                handleClick={() => handleClick(reciter.name, reciter.moshaf)}
                key={reciter.id}
                name={reciter.name}
                index={index + 1}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
