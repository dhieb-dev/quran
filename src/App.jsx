import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, IsOnline, NotFound, PlayerAudio } from './components/index';
import DataContext from "./context/DataContext";
import { Header } from './layout/index';
import { Quran, Radio } from './pages/index';
import './App.css';
export default function App() {
  const [passReciterId, setPassReciterId] = useState(false);
  const [passRewayah, setPassRewayah] = useState(false);
  const [passUrl, setPassUrl] = useState(false);
  const [nextOrPrev, setNextOrPrev] = useState()
  const [activeComponent, setActiveComponent] = useState("reciters")
  const [currentLang, setcurrentLang] = useState("ar");
  const [search, setSearch] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);
  return (
    <BrowserRouter>
      <div className='App bg-neutral-50/70 dark:bg-neutral-900/90 dark:text-white min-h-screen'>
        <img className='fixed top-0 left-0 -z-[1] object-cover bg-left w-full h-full' src={require('./static/images/bg-main.gif')} alt="" />
        <DataContext.Provider
          value={
            {
              passReciterId,
              setPassReciterId,
              passRewayah,
              setPassRewayah,
              passUrl,
              setPassUrl,
              nextOrPrev,
              setNextOrPrev,
              activeComponent,
              setActiveComponent,
              currentLang,
              setcurrentLang,
              search,
              setSearch,
              resultSearch,
              setResultSearch
            }}>
          <Header />
          <Container>
            <main dir={`${currentLang === "eng" ? "ltr" : "rtl"}`}>
              <Routes>
                <Route path='/' element={<Quran />} />
                <Route path='/radio' element={<Radio />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
              {passUrl && <PlayerAudio />}
            </main>
            <IsOnline />
          </Container>
        </DataContext.Provider>
      </div>
    </BrowserRouter >
  );
}
