import React from 'react';
import {useEffect } from 'react';
import {useAuthContext} from '../hooks/useAuthContext';

// Components
import ArtworkDetails from '../components/ArtworkDetails';
import { useArtworksContext } from '../hooks/useArtworksContext';


const GalleryPage = () => {
  //const [gallery, setGallery] = useState(null)
  const {gallery, dispatch} = useArtworksContext()
  const {user} = useAuthContext()


  useEffect(() => {
    const fetchArtworks = async () => {
      if (user) { // Check if user exists before making the API request
        try {
          const response = await fetch('http://localhost:8080/api/artworks', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          // Each object from backend represents an artwork
          // Array of objects here
          const json = await response.json();
  
          if (response.ok) {
            dispatch({ type: 'SET_ARTWORKS', payload: json });
          }
        } catch (error) {
          console.error('Error fetching artworks:', error);
        }
      }
    };
  
    fetchArtworks(); // Call the fetchArtworks function
  
  }, [dispatch, user]);
  


  return (
    <div className="GalleryPage bgDark light flex flex-col  h-full">

      <div className='self-center text-4xl py-8 headFont font-bold w-80'>
        <h1 className='light'>Sydney Gallery</h1>
      </div>


      <div className='gallery grid lg:grid-cols-4 gap-10 p-4 mx-auto'>
        {/* If we have a gallery then map */}
        {gallery && gallery.map((artwork) => (
            <ArtworkDetails key={artwork._id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}

export default GalleryPage;