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
      const response = await fetch('http://13.236.67.134:9090/api/artworks', {
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
    <div className="flex flex-col h-screen GalleryPage mt-12">

      <div className='self-center py-8 text-5xl font-bold headFont '>
        <h1 className='text-sky-950 uppercase'>{gallery && gallery.gallery.displayName}</h1>
      </div>


      <div className='grid gap-10 p-16 mx-auto gallery lg:grid-cols-4'>
        {/* If we have a gallery then map */}
        {gallery && gallery.artworks.map((artwork) => (
            <ArtworkDetails key={artwork._id} artwork={artwork} />
        ))}
      </div>
    </div>
    </>
    
  );
}

export default GalleryPage;