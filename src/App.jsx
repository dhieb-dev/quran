import { BrowserRouter } from 'react-router-dom';
import { Container, IsOnline } from './components/index';
import ContextProvider from "./context/Context";
import { Header, Main } from './layout/index';
import './App.css';

export default function App() {

  return (
    <BrowserRouter>
      <ContextProvider>
        <div className='App relative dark:text-white min-h-screen before:fixed before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-gradient-to-tr before:from-slate-200 before:to-slate-50 dark:before:from-neutral-950 dark:before:to-slate-900'>
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
