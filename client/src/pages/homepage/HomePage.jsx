import React, { useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import HomePageArtworks from './HomePageArtworks'
import HomePageGraphs from './HomePageGraphs'
import bgbanner from './bg.png'
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar'
import barcode from '../../images/barcode.png'
import robot from '../../images/robot.png'
import fluid from '../../images/fluidpurple.png'
import eye from '../../images/eye.png'
import ai from '../../images/ai.png'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the styles


function HomePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      offset: 100,    // Offset (in pixels) from the original trigger point
    });
  }, []); // Run AOS initialization only once when the component mounts

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

      <div className="flex justify-center ">

        <div className="flex-col items-center justify-center w-full rounded shadow-md">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col mt-8 text-center text-5xl font-bold justify-center opacity-0 transform translate-y-[-50px] transition-transform duration-700 ease" id="animatedHeader">
              <div className='flex justify-center border-b-2 border-black'>
                <h2
                  style={{ transform: 'scaleY(1.9)', /* default scale */ }}
                  className="py-2 mb-4 md:py-4 md:mb-8 lg:py-6 lg:mb-12 tracking-wider text-5xl"
                >
                  TODAY'S ARTIZATION SUMMARY
                </h2>
                <img
                  src={barcode}
                  alt="barcode"
                  className='lg:w-40 w-72 md:pt-0 pt-32 lg:self-start self-end'
                />
              </div>


              <HomePageGraphs />
            </div>

            <div className="mb-40 ">
              <HomePageArtworks />
            </div>


          </div>


          <div className='w-full h-auto'>
            <div className='grid grid-cols-2'>

            <div className='mx-20 ' data-aos="fade-right">
            <img src={fluid} alt="fluid" className='w-96 p-8' />
            </div>

            <div className='flex flex-col justify-center items-center m-8'>
              <h2 className='text-4xl'>SEE THE LATEST UPDATES</h2>
              <p className='text-left'>
              Stay connected to the pulse of your gallery, adapting and enhancing the 
              viewer experience based on the immediate and ever-evolving insights from our real-time data analytics.
              </p>
              <a className='text-cyan-400 mt-8' href='#'>FOLLOW OUR TIPS</a>
            </div>



            </div>
          </div>

          <div className='w-full h-auto'>
          <div className='bg-black flex h-80 justify-center items-center text-center'>
            <p className='text-4xl text-white mx-20' data-aos="fade-up">
            Track the flow of visitors through the gallery space using path analysis. 
            Identify common routes and focal points to enhance the natural progression of the exhibition.
            </p>
          </div>

          </div>


          <div className='w-full h-auto'>
            <div className='grid grid-cols-2'>

            <div className='mx-20 ' data-aos="fade-left">
            <img src={eye} alt="fluid" className='w-96 p-8' />
            </div>

            <div className='flex flex-col justify-center text-left m-8 order-first'>
              <h2 className='text-4xl'>FEEDBACK FOR ARTISTIC DIRECTION</h2>
              <p className='text-left'>
              Use emotional analytics as a form of feedback on your artistic direction. 
              Understand which emotional tones are more prevalent and consider adjusting your work accordingly.
              </p>
              <a>SEE OUR TIPS</a>
            </div>



            </div>
          </div>






        </div>


        

      </div>
    </>

  )
}

export default HomePage
