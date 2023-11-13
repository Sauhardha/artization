import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import HomePageArtworks from './HomePageArtworks'
import HomePageGraphs from './HomePageGraphs'
import HomePageGraph2 from './HomePageGraph2'
import bgbanner from './bg.png'
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar'


function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuthContext()
  const [artworks, setArtworks] = useState([])
  
  useEffect(() => {
    const animatedHeader = document.getElementById('animatedHeader');
    if (animatedHeader) {
      animatedHeader.classList.remove('opacity-0', 'translate-y-[-50px]');
      animatedHeader.classList.add('translate-y-0');
    }
  }, []); 


  useEffect(() => {
    const fetchHottestSessions = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/artworks/sessions/hottest',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )

        if (response.status === 200) {
          setArtworks(response.data)
        }
      } catch (e) {}
    }

    fetchHottestSessions()
  }, [])



  return (
    <>
      <Navbar />

      <div className="flex justify-center h-screen ">

        <div className="flex-col items-center justify-center w-full rounded shadow-md">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col mt-8 text-center text-5xl font-bold justify-center opacity-0 transform translate-y-[-50px] transition-transform duration-700 ease" id="animatedHeader">
              <h2 className="py-8 border-b-4 border-black">TODAY'S ARTIZATION SUMMARY</h2>
              <HomePageGraphs />
              {artworks && <HomePageGraph2 artworks={artworks}/>}
            </div>

            <div className="mb-40 ">
              <HomePageArtworks artworks={artworks}/>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default HomePage
