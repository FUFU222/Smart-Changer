import { ModalProvider } from './context/ModalContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomModal from './components/CustomModal'
import Header from '../src/components/Header'
import Main from '../src/components/Main'
import Footer from '../src/components/Footer'
import './style/App.css';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  return (
    <Router>
      <ModalProvider>
        <div className="App">
          <CustomModal/>
          <Header/>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
            <Route path="/terms-of-service" element={<TermsOfService/>}/>
          </Routes>
          <Footer/>
        </div>
      </ModalProvider>
    </Router>
  );
}

export default App;
