import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/HomePage/HomePage';
import Signup from './pages/SignupPage/SignupPage';
import Acc from './pages/Acc/Acc';
import Feeds from './pages/Feeds/Feeds'
import UploadPage from './pages/UploadPage/UploadPage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/acc' element={<Acc />} />
            <Route path='/feeds' element={<Feeds />} />
            <Route path='/uploadpage' element={<UploadPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
