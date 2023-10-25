import React from 'react';
import ArtworkForm from '../components/ArtworkForm';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';


// Components
import ArtworkDetails from '../components/ArtworkDetails';
import { useArtworksContext } from '../hooks/useArtworksContext';

function AdminPage() {
  const { gallery, dispatch } = useArtworksContext()
  const { user } = useAuthContext()


  useEffect(() => {
    const fetchArtworks = async () => {
      const response = await fetch('http://localhost:8080/api/artworks', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      // Each object from backend represents an artwork
      // Array of objects here
      const json = await response.json()

      if (response.ok) {
        //setGallery(json)
        dispatch({ type: 'SET_ARTWORKS', payload: json })
      }
    };

    if (user) {
      fetchArtworks();
    }

  }, [dispatch, user]);


  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full p-8 AdminPage bgDark">

        <ArtworkForm />


        <div className='grid gap-10 p-4 p-8 mx-auto text-white gallery lg:grid-cols-4'>
          {gallery && gallery.map((artwork) => (
            <ArtworkDetails key={artwork._id} artwork={artwork} isAdminView={true} />
          ))}
        </div>
      </div>
    </>

  );
}

export default AdminPage;