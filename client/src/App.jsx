import React from 'react';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import Navbar from './components/Navbar';
// import { Router, Route, Routes } from "react-router-dom"; //Will use to create routes later
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {

  return (
    //All components that are nested inside this App component have access to the router
   <div>
    <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path='' element= { <Login/>} />  */}
          <Route path='/signup' element={<Signup />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/gallery" element={<GalleryPage/>} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App;
