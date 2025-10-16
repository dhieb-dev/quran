import { useFetch } from "../hooks/index";
import { ListItem, Loading, Search } from "../components/index";
import { useContext, useEffect, useState } from "react";
import { Context, AudiosContext } from "../context/index";

export const Surahs = () => {
  const { data, loading } = useFetch("https://www.mp3quran.net/api/v3/suwar");
  const { reciterData, moshafData } = useContext(Context);
  const { setAudioIndex, setAudioList } = useContext(AudiosContext);
  const [suwar, setSuwar] = useState([]);
  const [moshaf, setMoshaf] = useState(reciterData?.moshaf[0]);
  const [result, setResult] = useState();

  // Add Surahs Fined to the State (suwar)
  useEffect(() => {
    if (data && moshaf) {
      setSuwar(
        moshaf.surah_list
          .split(",")
          .map((item) => data.suwar.find((surah) => surah.id === +item))
      );
      if (result) setSuwar(result);
    }
  }, [data, moshaf, result]);

  // update moshaf from moshafData
  useEffect(() => {
    if (moshafData) setMoshaf(moshafData);
  }, [moshafData]);

  if (loading) return <Loading />;

  const handleClick = (index) => {
    setAudioIndex(index);
    if (suwar) {
      setAudioList(
        suwar.map((surah) => [
          surah.name,
          `${moshaf.server}${String(surah.id).padStart(3, "0")}.mp3`,
        ])
      );
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <Search getSearchArr={suwar} setResult={setResult} />
        <p>{suwar.length === 0 ? "لا يوجد" : suwar.length} سورة</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 animate-softVision">
        {suwar.map((surah, index) => (
          <ListItem
            handleClick={() => handleClick(index)}
            key={surah.id}
            name={surah.name}
            index={surah.id}
            isMakkia={surah.makkia}
          />
        ))}
      </div>
    </section>
  );
};
