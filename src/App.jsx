import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container, IsOnline, PlayerAudio } from './components/index';
import DataContext from "./context/DataContext";
import { Header, Main } from './layout/index';
import './App.css';
export default function App() {
  const [passReciterId, setPassReciterId] = useState(false);
  const [passRewayah, setPassRewayah] = useState(false);
  const [passUrl, setPassUrl] = useState(false);
  const [nextOrPrev, setNextOrPrev] = useState()
  const [currentLang, setcurrentLang] = useState("ar");
  const [search, setSearch] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);
  return (
    <BrowserRouter>
      <div className='App bg-neutral-50/70 dark:bg-neutral-900/90 dark:text-white min-h-screen'>
        <img className='fixed top-0 left-0 -z-[1] w-full h-full' src={require('./static/images/bg-main.jpeg')} alt="" />
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
            {passUrl && <PlayerAudio />}
            <IsOnline />
          </Container>
        </DataContext.Provider>
      </div>
    </BrowserRouter >
  );
}