import React from 'react';
import {useEffect } from 'react';
import {useAuthContext} from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';

// Components
import ArtworkDetails from '../components/ArtworkDetails';
import { useArtworksContext } from '../hooks/useArtworksContext';


const GalleryPage = () => {
  //const [gallery, setGallery] = useState(null)
  const {gallery, dispatch} = useArtworksContext()
  const {user} = useAuthContext()


  useEffect(() => {
    const fetchArtworks = async () => {
      const response = await fetch('http://localhost:8080/api/artworks', {
        headers: {
          'Authorization': `Bearer ${user.token}`}})
      // Each object from backend represents an artwork
      // Array of objects here
      const json = await response.json()

      if (response.ok) {
        //setGallery(json)
        dispatch({type:'SET_ARTWORKS', payload:json})
      }
    };
  
    fetchArtworks(); 
  
  }, [dispatch, user]);
  


  return (
    <>
    <Navbar />
    <div className="flex flex-col h-full GalleryPage bgDark light">

      <div className='self-center py-8 text-4xl font-bold headFont w-80'>
        <h1 className='light'>Sydney Gallery</h1>
      </div>


      <div className='grid gap-10 p-4 mx-auto gallery lg:grid-cols-4'>
        {/* If we have a gallery then map */}
        {gallery && gallery.map((artwork) => (
            <ArtworkDetails key={artwork._id} artwork={artwork} />
        ))}
      </div>
    </div>
    </>
    
  );
}

export default GalleryPage;