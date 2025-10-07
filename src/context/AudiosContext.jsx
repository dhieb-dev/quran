import { createContext, useState } from "react";
const AudiosContext = createContext(null);
export const AudiosContextProvider = ({ children }) => {
  const [audioIndex, setAudioIndex] = useState(" ");
  const [audioList, setAudioList] = useState(null);
  const values = {
    audioIndex,
    setAudioIndex,
    audioList,
    setAudioList,
  };
  return (
    <AudiosContext.Provider value={values}>{children}</AudiosContext.Provider>
  );
};
export default AudiosContext;
