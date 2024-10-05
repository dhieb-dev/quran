import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, NotFound, PlayerAudio } from './components/index';
import DataContext from "./context/DataContext";
import { Header } from './layout/index';
import { Quran, Radio } from './pages/index';
import './App.css';
export default function App() {
  const [passReciter, setPassReciter] = useState(false);
  const [passRewayah, setPassRewayah] = useState(false);
  const [passUrl, setpassUrl] = useState(false);
  const [nextOrPrev, setNextOrPrev] = useState()
  const [activeComponent, setActiveComponent] = useState("reciters")
  const [currentLang, setcurrentLang] = useState("ar");
  return (
    <BrowserRouter>
      <div className='App bg-neutral-50 dark:bg-neutral-950 dark:text-neutral-50 min-h-screen'>
        <DataContext.Provider
          value={
            {
              passReciter,
              setPassReciter,
              passRewayah,
              setPassRewayah,
              passUrl,
              setpassUrl,
              nextOrPrev,
              setNextOrPrev,
              activeComponent,
              setActiveComponent,
              currentLang,
              setcurrentLang,
            }}>
          <Header />
          <Container>
            <main dir='rtl'>
              <Routes>
                <Route path='/' element={<Quran />} />
                <Route path='/radio' element={<Radio />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
              <PlayerAudio />
            </main>
          </Container>
        </DataContext.Provider>
      </div>
    </BrowserRouter >
  );
}