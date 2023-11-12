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
    <div className="flex justify-center text-white h-max bgDark">
      <div className="flex-col items-center justify-center w-full p-0 rounded shadow-md">
        <div className="flex flex-col justify-center">
          {/* <div
            style={{
              border: '1px solid red',
              height: 'rem',
              // overflow: 'hidden',
            }}
          >
            <img
              src={bgbanner}
              alt="background banner"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div> */}
          <div className="bg-white">
            <HomePageGraphs />
          </div>
          <div className="mb-40 ">
            <HomePageArtworks />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
