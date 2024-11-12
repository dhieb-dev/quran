import { BrowserRouter } from "react-router-dom";
import { Container, IsOnline } from "./components/index";
import ContextProvider from "./context/Context";
import { Header, Main } from "./layout/index";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App dark:text-white min-h-screen bg-gradient-to-tr from-slate-100 to-slate-50 dark:from-neutral-950 dark:to-neutral-800">
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
