import React, { useEffect, useState } from 'react';
import { useArtworksContext } from '../hooks/useArtworksContext';
import {useAuthContext} from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import ArtworkSubSectionGraphs from '../components/ArtworkSubSectionGraphs';
import ArtworkSubSectionDetails from '../components/ArtworkSubSectionDetails';

function ArtworkPage() {
    const {id} = useParams()
    const [artwork, setArtwork] = useState({})

    const {gallery, dispatch} = useArtworksContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        if(gallery && gallery.length > 0){
            for(const oneArtwork of gallery){
                if(oneArtwork._id === id){
                    setArtwork(oneArtwork)
                }
            }
        }else{
            const fetchArtworks = async () => {
                const response = await fetch(`http://localhost:8080/api/artworks/${id}`, {
                  headers: {
                    'Authorization': `Bearer ${user.token}`}})
                const json = await response.json()
          
                if (response.ok) {
                    setArtwork(json)
                }
              };
            
              fetchArtworks(); 
        }
    }, [])


    
  return (
    <div className='flex justify-center text-white h-max bgDark'>
            <div className="flex flex-col items-center justify-center w-full rounded md:space-x-0 md:mx-10 md:flex-row" >
                <ArtworkSubSectionDetails artwork={artwork}/>
                <ArtworkSubSectionGraphs artwork={artwork}/>
                {/* <div className='flex justify-center mx-auto'>
                    <h1 className='my-40 text-3xl headFont'>artwork</h1>
                </div> */}

            </div>
        </div>
  );
}

export default ArtworkPage;