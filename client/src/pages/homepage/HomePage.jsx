import React, { useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import HomePageArtworks from './HomePageArtworks'
import HomePageGraphs from './HomePageGraphs'
import bgbanner from './bg.png'
import { useNavigate } from "react-router-dom";


function HomePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();


  // useEffect(() => {

  //   const fetchHottestSessions = async () => {
  //     const response = await axios.get('http://localhost:8080/api/artworks/sessions/hottest', {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     })
  //     // const json = await response.json()

  //     // if (response.ok) {
  //     //     setArtwork(json)
  //     // }
  //   }

  //   fetchHottestSessions()
  // }, [])
 

  return (
    <>
    <Navbar />

    <div className="flex justify-center text-white h-max bgDark">
      
      <div className="flex-col items-center justify-center w-full rounded shadow-md">
        <div className="flex flex-col justify-center">
          <div className="bgDark flex flex-col text-center text-4xl font-bold bodyFont justify-center">
            <h2>Today's Artization Summary</h2>
            <HomePageGraphs />
          </div>
          <div className="mb-40 ">
            <HomePageArtworks />
          </div>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default HomePage
