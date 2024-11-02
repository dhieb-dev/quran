import { useState, createContext } from "react";
export const Context = createContext(null)

const ContextProvider = ({ children }) => {

  const [passReciter, setPassReciter] = useState(false);
  const [passRewayah, setPassRewayah] = useState(false);
  const [passAudio, setPassAudio] = useState(false);
  const [activeComponent, setActiveComponent] = useState("reciters")
  const [currentLang, setcurrentLang] = useState("ar");
  const [search, setSearch] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);

  const contextValues = {
    passReciter,
    setPassReciter,
    passRewayah,
    setPassRewayah,
    passAudio,
    setPassAudio,
    activeComponent,
    setActiveComponent,
    currentLang,
    setcurrentLang,
    search,
    setSearch,
    resultSearch,
    setResultSearch
  }

  return (
    <Context.Provider value={contextValues}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider; 