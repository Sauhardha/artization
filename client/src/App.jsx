import React, {} from 'react';
import HomePage from './pages/homepage/HomePage';
import GalleryPage from './pages/GalleryPage';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import About from './pages/AboutPage';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import { useAuthContext } from './hooks/useAuthContext';
import ArtworkPage from './pages/ArtworkPage';



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
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/artwork/:id" element={<ArtworkPage/>} />
            </>
          ) : (
            // Default route when user is not logged in
            <Route path="/*" element={<Login />} />
          )}

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* If not logged in, access signup */}
          {!user && <Route path="/signup" element={<Signup />} />}
          {!user && <Route path="/about" element={<About />} />}
        </Routes>
        </div>
    </BrowserRouter>
   </div>
  )
}

export default App;
