import { useContext, useEffect } from "react";
import Context from "../context/Context";

export const Moshaf = () => {
  const { reciterData, moshafData, setMoshafData } = useContext(Context);
  useEffect(() => {
    return () => {
      if (moshafData !== 0) setMoshafData(0);
    };
  }, [moshafData, setMoshafData]);

  return (
    <select
      className="focus:outline-none bg-blue-200 rounded-md px-2"
      onChange={(e) => setMoshafData(e.target.value)}
    >
      {reciterData?.moshaf.map((moshaf, index) => (
        <option key={index} value={index}>
          {moshaf.name}
        </option>
      ))}
    </select>
  );
};
