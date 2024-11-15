import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Nav/Nav'; 
import BookingPage from './pages/BookingPage/BookingPage'; 
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage'; 
import LoadingScreen from './pages/LoadingScreen/LoadingScreen'; 

const App: React.FC = () => {
  const location = useLocation();  
  
  return (
    <>
      {location.pathname !== '/' && <Navbar />}

      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </>
  );
};

export default App;