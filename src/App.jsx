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
          className="App dark:text-white min-h-screen bg-slate-50 dark:bg-neutral-900"
        >
          {loader && <LoaderPage />}
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
