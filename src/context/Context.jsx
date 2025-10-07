import { createContext, useState } from "react";
const Context = createContext(null);
export const ContextProvider = ({ children }) => {
  const [reciterData, setReciterData] = useState(null);
  const [moshafData, setMoshafData] = useState();
  const [lang, setLang] = useState({ native: "العربية", locale: "ar" });
  const values = {
    reciterData,
    setReciterData,
    moshafData,
    setMoshafData,
    lang,
    setLang,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};
export default Context;
