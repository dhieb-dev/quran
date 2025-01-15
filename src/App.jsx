import { BrowserRouter } from "react-router-dom";
import { Container, IsOnline, TopBack } from "./components/index";
import ContextProvider from "./context/Context";
import { Header, Main } from "./layout/index";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App overflow-hidden animate-opacity text-secondary">
          <div className="bg-main fixed top-0 left-0 w-full h-full"/>
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
