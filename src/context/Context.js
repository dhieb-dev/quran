import { useState, createContext } from "react";
export const Context = createContext(null);
const ContextProvider = ({ children }) => {
  const [passReciter, setPassReciter] = useState();
  const [passRewayah, setPassRewayah] = useState();
  const [passAudio, setPassAudio] = useState();
  const [saveAllAudios, setSaveAllAudios] = useState();
  const [search, setSearch] = useState([]);
  const [nextOrPrev, setNextOrPrev] = useState();
  const [findedItem, setFindedItem] = useState();
  const [activeComponent, setActiveComponent] = useState("reciters");

  const contextValues = {
    passReciter,
    setPassReciter,
    passRewayah,
    setPassRewayah,
    passAudio,
    setPassAudio,
    saveAllAudios,
    setSaveAllAudios,
    activeComponent,
    setActiveComponent,
    search,
    setSearch,
    findedItem,
    setFindedItem,
    nextOrPrev,
    setNextOrPrev,
  };
  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};
export default ContextProvider;
