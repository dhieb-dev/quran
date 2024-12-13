import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, IsOnline, LoaderPage, TopBack } from "./components/index";
import ContextProvider from "./context/Context";
import { Header, Main } from "./layout/index";
import "./App.css";
export default function App() {
  const [loader, setLoader] = useState(true);

  return (
    <BrowserRouter>
      <ContextProvider>
        <div
          onLoad={() => setTimeout(() => setLoader(false), 1000)}
          className="App  dark:text-white min-h-screen bg-slate-50/85 dark:bg-neutral-950/95"
        >
          <img
            className="fixed -z-[1] object-cover object-center w-full h-full hue-rotate-180"
            src={require("./static/images/bg-main.webp")}
            alt="bg main"
          />
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
