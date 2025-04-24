import { useFetch } from "../hooks/index";
import { ListItem, Loading } from "../components/index";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

export const Surahs = () => {
  const { data, loading } = useFetch("suwar");
  const { reciterData, moshafData, setAudioIndex, setAudioList } =
    useContext(Context);
  const [suwar, setSuwar] = useState(null);
  const [moshafs, setMoshafs] = useState(reciterData.moshaf);

  // Add Surahs Fined to the State (suwar)
  useEffect(() => {
    if (moshafs && data) {
      const moshaf = moshafs[moshafData];
      const surahsNum = moshaf.surah_list.split(",");
      const suwar = surahsNum.map((item) =>
        data?.suwar.find((surah) => surah.id === +item)
      );
      setSuwar(suwar);
    }
  }, [moshafs, data, moshafData]);

  // Add Moshafs to the State (moshafs)
  useEffect(() => {
    if (reciterData) {
      setMoshafs(reciterData.moshaf);
    }
  }, [reciterData]);

  // Add Surahs & Names to the State (AudioList in Context)
  useEffect(() => {
    if (suwar) {
      const srcMain = moshafs[moshafData].server;
      const audioList = suwar.map((surah) => [
        surah.name,
        `${srcMain}${String(surah.id).padStart(3, "0")}.mp3`,
      ]);
      setAudioList(audioList);
    }
  }, [suwar, setAudioList, moshafData, moshafs]);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 animate-softVision">
          {suwar?.map((surah, index) => (
            <ListItem
              handleClick={() => setAudioIndex(index)}
              key={surah.id}
              name={surah.name}
              index={surah.id}
              isMakkia={surah.makkia}
            />
          ))}
        </div>
      )}
    </section>
  );
};
