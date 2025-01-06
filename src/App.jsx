import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, IsOnline, LoaderPage, TopBack } from "./components/index";
import ContextProvider from "./context/Context";
import { Header, Main } from "./layout/index";
import "./App.css";
import { bgMain } from "./svgs/bgMain";

export default function App() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoader(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App overflow-hidden dark:text-white min-h-screen bg-white dark:bg-black">
          <div className="fixed w-full h-full opacity-50">{bgMain.bg}</div>
          {loader && <LoaderPage />}
          <Header />
          <Container>
            <Main />
            <IsOnline />
          </Container>
          <TopBack />
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}
