import { ModalProvider } from './context/ModalContext';
import CustomModal from './components/Modal'
import Header from '../src/components/Header'
import Main from '../src/components/Main'
import Footer from '../src/components/Footer'
import './style/App.css';

function App() {
  return (
    <ModalProvider>
      <div className="App">
        <CustomModal/>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    </ModalProvider>
  );
}

export default App;
