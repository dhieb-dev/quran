import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, IsOnline, LoaderPage, TopBack } from "./components/index";
import ContextProvider from "./context/Context";
import { Header, Main } from "./layout/index";
import "./App.css";
import { bgMain } from "./svgs/bgMain";
export default function App() {
  const [loader, setLoader] = useState(true);

  return (
    <BrowserRouter>
      <ContextProvider>
        <div
          onLoad={() => setTimeout(() => setLoader(false), 500)}
          className="App overflow-hidden dark:text-white min-h-screen bg-slate-50/70 dark:bg-neutral-950/90"
        >
          {bgMain.bg}
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
