import { ContextProvider } from "./context/Context";
import { IsOnline, TopBack } from "./components/index";
import { Footer, Header, Main } from "./layouts/index";
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <ContextProvider>
        <Main />
      </ContextProvider>
      <Footer />
      <TopBack />
      <IsOnline />
    </>
  );
};
export default App;
