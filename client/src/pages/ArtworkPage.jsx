import React, { useEffect, useState } from 'react';
import { useArtworksContext } from '../hooks/useArtworksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import ArtworkSubSectionGraphs from '../components/ArtworkSubSectionGraphs';
import ArtworkSubSectionDetails from '../components/ArtworkSubSectionDetails';
import Navbar from '../components/Navbar';
import SubSectionGraph2 from './SubSectionGraph2';
import AOS from 'aos';

function ArtworkPage() {
    const { id } = useParams()
    const [artwork, setArtwork] = useState({})

    useEffect(() => {
        AOS.init({
          duration: 1000, // Animation duration in milliseconds
          offset: 100,    // Offset (in pixels) from the original trigger point
        });
      }, []); // Run AOS initialization only once when the component mounts

    const {gallery, dispatch} = useArtworksContext()
    const {user} = useAuthContext()

    useEffect(() => {
        if (gallery && gallery.length > 0) {
            for (const oneArtwork of gallery) {
                if (oneArtwork._id === id) {
                    setArtwork(oneArtwork)
                }
            }
        } else {
            const fetchArtworks = async () => {
                const response = await fetch(`http://54.226.113.32:9090/api/artworks/${id}`, {
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
        <>
            <Navbar />
            <div className='flex justify-center mt-20 h-max'>
                <div className="flex flex-col items-center justify-center w-full rounded md:space-x-0 md:mx-10 md:flex-row" >

                    <ArtworkSubSectionDetails artwork={artwork} />
                    <div className='flex-col h-auto mb-12'>
                    <div className='w-[22vw]'  data-aos="fade-down">
                        <ArtworkSubSectionGraphs artwork={artwork} />
                    </div>

                    <div className='w-[45vw'  data-aos="fade-up">
                        <SubSectionGraph2/>
                    </div>
                    </div>
                 

                </div>
            </div>
        </>

    );
}

export default ArtworkPage;