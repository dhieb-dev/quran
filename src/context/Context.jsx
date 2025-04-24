import { createContext, useState } from "react";
const Context = createContext(null);
export const ContextProvider = ({ children }) => {
  const [reciterData, setReciterData] = useState(null);
  const [moshafData, setMoshafData] = useState(0);
  const [audioIndex, setAudioIndex] = useState(" ");
  const [audioList, setAudioList] = useState(null);
  const values = {
    reciterData,
    setReciterData,
    moshafData,
    setMoshafData,
    audioIndex,
    setAudioIndex,
    audioList,
    setAudioList,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export default Context;
