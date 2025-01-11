import { BrowserRouter } from "react-router-dom";
import { Container, IsOnline, TopBack } from "./components/index";
import ContextProvider from "./context/Context";
import { Header, Main } from "./layout/index";
import "./App.css";
import { bgMain } from "./svgs/bgMain";

export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App overflow-hidden animate-opacity bg-main text-secondary min-h-screen">
          <div className="bg-main fixed top-0 left-0 w-full h-full opacity-80">
            {bgMain.bg}
          </div>
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
