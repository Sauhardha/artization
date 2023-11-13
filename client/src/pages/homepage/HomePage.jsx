import React, { useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import HomePageArtworks from './HomePageArtworks'
import HomePageGraphs from './HomePageGraphs'
import bgbanner from './bg.png'
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar'


function HomePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // In your JavaScript (useEffect or wherever you handle page load)
  useEffect(() => {
    const animatedHeader = document.getElementById('animatedHeader');
    if (animatedHeader) {
      animatedHeader.classList.remove('opacity-0', 'translate-y-[-50px]');
      animatedHeader.classList.add('translate-y-0');
    }
  }, []); // Run this effect only once on component mount



  return (
    <>
      <Navbar />

      <div className="flex justify-center h-screen ">

        <div className="flex-col items-center justify-center w-full rounded shadow-md">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col mt-8 text-center text-5xl font-bold justify-center opacity-0 transform translate-y-[-50px] transition-transform duration-700 ease" id="animatedHeader">
              <h2 className="border-b-4 border-black py-8">TODAY'S ARTIZATION SUMMARY</h2>
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
