import { useState } from "react";
import { Reciters, Surahs } from "./index";
import { Moshaf } from "../layouts/index";
import { GoBack } from "../components/index";

export const QuranAudios = () => {
  const [nameReciter, setNameReciter] = useState("");
  return (
    <div className="quran-audio">
      {nameReciter && (
        <div className="flex justify-between">
          <GoBack
            onclick={() => {
              setNameReciter(null);
            }}
          />
          <p className="mr-2 underline">{nameReciter}</p>
          <Moshaf />
        </div>
      )}

      {!nameReciter && <Reciters setNameReciter={setNameReciter} />}
      {nameReciter && <Surahs />}
    </div>
  );
};
