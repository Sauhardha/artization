import React from 'react';
import ArtworkForm from '../components/ArtworkForm';
import {useEffect } from 'react';
import {useAuthContext} from '../hooks/useAuthContext';


// Components
import ArtworkDetails from '../components/ArtworkDetails';
import { useArtworksContext } from '../hooks/useArtworksContext';

function AdminPage() {
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