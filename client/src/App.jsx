import React, { useEffect, useState } from 'react';
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
import Users from './pages/Users';
import Galleries from './pages/gallery/Galleries';
import WelcomeMessage from './pages/WelcomeMessage';
import GalleryManagement from './pages/gallery/GalleryManagement';

function App() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && !storedUser.permissions.length > 0) {
      window.location.replace('/welcome');
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    // Show loader while authentication is in progress
    return <div className="loader">Loading...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            {/* Default route when user is logged in */}
            {user ? (
              <>
                <Route path="/" element={<Navigate to="/welcome" />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/users" element={<Users />} />
                <Route path='/galleries' element={<Galleries />} />
                <Route path="/gallery-management/:id" element={<GalleryManagement />} />

                <Route path="/artwork/:id" element={<ArtworkPage />} />
                <Route path='/welcome' element={<WelcomeMessage />} />
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
  );
}

export default App;
