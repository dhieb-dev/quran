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
          onLoad={() => setTimeout(() => setLoader(false), 1500)}
          className="App overflow-hidden dark:text-white min-h-screen bg-slate-50/0 dark:bg-neutral-950/95"
        >
          <svg
            className="fixed -z-[1] w-full"
            id="visual"
            viewBox="0 0 900 1200"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <defs>
              <filter id="blur1" x="-10%" y="-10%" width="120%" height="120%">
                <feFlood
                  floodOpacity="0"
                  result="BackgroundImageFix"
                ></feFlood>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend>
                <feGaussianBlur
                  stdDeviation="161"
                  result="effect1_foregroundBlur"
                ></feGaussianBlur>
              </filter>
            </defs>
            <rect width="100%" height="100%" className="fill-blue-200 dark:bg-neutral-700"></rect>
            <g filter="url(#blur1)">
              <circle cx="820" cy="442" className="fill-sky-100" r="357"></circle>
              <circle cx="349" cy="304" className="fill-blue-100" r="357"></circle>
              <circle cx="52" cy="528" className="fill-sky-200" r="357"></circle>
              <circle cx="502" cy="414" className="fill-green-300" r="357"></circle>
              <circle cx="26" cy="69" className="fill-sky-300" r="357"></circle>
              <circle cx="412" cy="66" className="fill-blue-50" r="357"></circle>
            </g>
          </svg>
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
