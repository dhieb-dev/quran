import { BrowserRouter } from "react-router-dom";
import { Container, IsOnline } from "./components/index";
import ContextProvider from "./context/Context";
import { Header, Main } from "./layout/index";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App dark:text-white min-h-screen bg-slate-100/80 dark:bg-neutral-950/90">
          <img
            className="fixed top-0 left-0 h-full w-full -z-[1] object-cover object-left"
            src={require("./static/images/bg-main.jpg")}
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
