import React from 'react';
import ArtworkForm from '../components/ArtworkForm';
import GalleryPage from './GalleryPage';
import {useEffect } from 'react';

// Components
import ArtworkDetails from '../components/ArtworkDetails';
import { useArtworksContext } from '../hooks/useArtworksContext';

function AdminPage() {
  const {gallery, dispatch} = useArtworksContext()


  useEffect(() => {
    const fetchArtworks = async () => {
      const response = await fetch('http://localhost:8080/api/artworks')
      // Each object from backend represents an artwork
      // Array of objects here
      const json = await response.json()

      if (response.ok) {
        //setGallery(json)
        dispatch({type:'SET_ARTWORKS', payload:json})
      }
    }

    fetchArtworks()
  }, [dispatch])


  return (
    <div className="AdminPage bgDark h-full flex flex-col p-8 justify-center items-center">

      <ArtworkForm />


      <div className='gallery grid lg:grid-cols-4 gap-10 p-4 mx-auto text-white p-8'>
        {gallery && gallery.map((artwork) => (
          <ArtworkDetails key={artwork._id} artwork={artwork} isAdminView={true} />
        ))}
      </div>
    </div>
  );
}

export default AdminPage;