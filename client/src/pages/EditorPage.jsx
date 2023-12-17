import React from 'react';
import ArtworkForm from '../components/ArtworkForm';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';


// Components
import ArtworkDetails from '../components/ArtworkDetails';
import { useArtworksContext } from '../hooks/useArtworksContext';

function EditorPage() {
  const { gallery, dispatch } = useArtworksContext()
  const { user } = useAuthContext()


  // Toggle Add new Artwork Form
  const [ShowCreateArtwork, setShowCreateArtwork] = useState(false);
  const handleSetupNewArtwork = () => {
    setShowCreateArtwork(true);
  };
  const handleCancelNewArtwork = (defaultParam = false) => {
    setShowCreateArtwork(defaultParam);
  };


  console.log('yoo', gallery)

  useEffect(() => {
    const fetchArtworks = async () => {
      if (user) { // Check if user exists before making the API request
        try {
          const response = await fetch('http://13.236.67.134:9090/api/artworks', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          //Each object is an artwork
          const json = await response.json();

          if (response.ok) {
            dispatch({ type: 'SET_ARTWORKS', payload: json });
          }
        } catch (error) {
          console.error('Error fetching artworks:', error);
        }
      }
    };

    if (user) {
      fetchArtworks();
    }

  }, [dispatch, user]);



  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full p-8 mt-12 EditorPage">
        <h1 className='self-center mb-8 text-5xl font-bold headFont'>EDIT YOUR GALLERY</h1>
       
      <div className='flex flex-row justify-between'>
      {ShowCreateArtwork ? (
        <ArtworkForm onCancel={handleCancelNewArtwork} />
      ) : (
        <div className="mt-4">
          <button
            className="px-4 py-2 mr-2 text-white duration-300 rounded bg-cyan-500 ease hover:bg-emerald-500 "
            onClick={handleSetupNewArtwork}
          >
            Add Art
          </button>
        </div>
      )}

      </div>
        


        <div className='grid gap-10 p-8 mx-auto text-white gallery lg:grid-cols-4'>
          {gallery && gallery.artworks?.map((artwork) => (
            <ArtworkDetails key={artwork._id} artwork={artwork} isAdminView={true} />
          ))}
        </div>
      </div>
    </>

  );
}

export default EditorPage;