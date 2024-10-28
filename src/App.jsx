import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container, IsOnline } from './components/index';
import DataContext from "./context/DataContext";
import { Header, Main } from './layout/index';
import './App.css';
export default function App() {
  const [passReciter, setPassReciter] = useState(false);
  const [passRewayah, setPassRewayah] = useState(false);
  const [passAudio, setPassAudio] = useState(false);
  const [nextOrPrev, setNextOrPrev] = useState()
  const [activeComponent, setActiveComponent] = useState("reciters")

  const [currentLang, setcurrentLang] = useState("ar");
  const [search, setSearch] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);
  return (
    <BrowserRouter>
      <div
        className='App relative dark:text-white min-h-screen before:fixed before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-gradient-to-tr before:from-slate-300 before:to-slate-50 dark:before:from-neutral-950 dark:before:to-slate-900'>
        <DataContext.Provider
          value={
            {
              passReciter,
              setPassReciter,
              passRewayah,
              setPassRewayah,
              passAudio,
              setPassAudio,
              nextOrPrev,
              activeComponent,
              setActiveComponent,
              setNextOrPrev,
              currentLang,
              setcurrentLang,
              search,
              setSearch,
              resultSearch,
              setResultSearch
            }}>
          <Header />
          <Container>
            <Main />
            <IsOnline />
          </Container>
        </DataContext.Provider>
      </div>
    </BrowserRouter >
  );
}