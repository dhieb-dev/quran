import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, IsOnline, LoaderPage } from "./components/index";
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
          className="App dark:text-white min-h-screen bg-slate-100/80 dark:bg-neutral-950/90"
        >
          {loader && <LoaderPage />}
          <img
            className="fixed top-0 left-0 h-full w-full -z-[1] object-cover object-left"
            src={require("./static/images/bg-main.webp")}
            alt="background main"
          />
          <Header />
          <Container>
            <Main />
            <IsOnline />
          </Container>
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}
