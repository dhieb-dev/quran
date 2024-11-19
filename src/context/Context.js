import { useState, createContext } from "react";
export const Context = createContext(null);
const ContextProvider = ({ children }) => {
  const [passReciter, setPassReciter] = useState();
  const [passRewayah, setPassRewayah] = useState();
  const [passAudio, setPassAudio] = useState();
  const [search, setSearch] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);
  const [findedItem, setFindedItem] = useState();
  const [activeComponent, setActiveComponent] = useState("reciters");
  const contextValues = {
    passReciter,
    setPassReciter,
    passRewayah,
    setPassRewayah,
    passAudio,
    setPassAudio,
    activeComponent,
    setActiveComponent,
    search,
    setSearch,
    resultSearch,
    setResultSearch,
    findedItem,
    setFindedItem,
  };
  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};
export default ContextProvider;
