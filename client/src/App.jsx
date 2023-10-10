import React from 'react';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import Navbar from './components/Navbar';
// import { Router, Route, Routes } from "react-router-dom"; //Will use to create routes later
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import { useAuthContext } from './hooks/useAuthContext';



function App() {
  const {user} = useAuthContext()


  return (
    //All components that are nested inside this App component have access to the router
   <div>
    <BrowserRouter>
        <Navbar />
        <div>
        <Routes>
          
          {/* Default route when user is logged in */}
          {user ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </>
          ) : (
            // Default route when user is not logged in
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* If not logged in, access signup */}
          {!user && <Route path="/signup" element={<Signup />} />}

        </Routes>
        </div>
    </BrowserRouter>
   </div>
  )
}

export default App;
