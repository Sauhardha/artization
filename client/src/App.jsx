import React from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
// import { Router, Route, Routes } from "react-router-dom"; //Will use to create routes later
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {



  return (
    //All components that are nested inside this App component have access to the router
   <div>
    <BrowserRouter>
        <Routes>
          <Route index element= { <HomePage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/gallery" element={<GalleryPage/>} />
        </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App;
