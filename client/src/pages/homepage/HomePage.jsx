import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import HomePageArtworks from './HomePageArtworks'
import HomePageGraphs from './HomePageGraphs'
import HomePageGraph2 from './HomePageGraph2'
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
  const navigate = useNavigate();
  const { user } = useAuthContext()
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    AOS.init({
      duration: 2000, 
      offset: 100,    
    });
  }, []); // Run AOS initialization only once when the component mounts

  


  useEffect(() => {
    const fetchHottestSessions = async () => {
      try {
        const response = await axios.get(
          'http://13.236.67.134:9090/api/artworks/sessions/hottest',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )

        if (response.status === 200) {
          setArtworks(response.data)
        }
      } catch (e) { }
    }

    fetchHottestSessions()
  }, [])



  return (
    <>
      <Navbar />

      <div className="flex justify-center ">

        <div className="flex-col items-center justify-center w-full rounded shadow-md">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col justify-center mt-8 font-bold text-center">

              <div className='flex flex-col justify-center' data-aos="fade-down">
                <h2 className="py-2 mb-4 text-5xl tracking-wide md:py-4 md:mb-8 lg:py-6 lg:mb-12">
                  TODAY'S ARTIZATION SUMMARY
                </h2>
              </div>

              <div className="h-auto mb-16 text-lg" data-aos="fade-up" data-aos-duration="3000">
                <HomePageArtworks artworks={artworks} />
              </div>

              <div className='w-full h-auto'>
            <div className='flex items-center justify-center text-center bgDark h-96'>
              <p className='mx-20 text-5xl font-thin tracking-widest text-white' data-aos="fade-up">
                Track the flow of visitors through the gallery and <br></br> enhance the natural progression of the exhibition.
              </p>
            </div>

          </div>

              <div className='p-8 mx-20 mt-8 shadow-xl bg-neutral-50 box-shadow rounded-xl'>
                <h2 className='text-5xl font-bold'>DAILY OVERVIEW</h2>
                <div className='flex justify-center'>


                  {artworks && <HomePageGraph2 artworks={artworks} />}


                </div>

              </div>

              <div className='w-full h-auto my-10'>
              <div className='grid grid-cols-2'>

                <div className='mx-20 ' data-aos="fade-right">
                  <img src={fluid} alt="fluid" className='p-8 w-96' />
                </div>

                <div className='flex flex-col items-center justify-center m-8'>
                  <h2 className='text-4xl'>SEE THE LATEST UPDATES</h2>
                  <p className='mt-4 text-left'>
                    Stay connected to the pulse of your gallery, adapting and enhancing the
                    viewer experience based on the immediate and ever-evolving insights from our real-time data analytics.
                  </p>
                  <a className='mt-8 text-cyan-400' href='#'>FOLLOW OUR TIPS</a>
                </div>



              </div>
            </div>

              <div>
                <HomePageGraphs />

              </div>

            

              

              

              

             

            </div>

            




          </div>




          

          <div className='w-full h-auto'>
                <div className='grid grid-cols-2 border-b border-black'>

                  <div className='mx-20 ' data-aos="fade-left">
                    <img src={eye} alt="fluid" className='p-2 w-96' />
                  </div>

                  <div className='flex flex-col justify-center order-first text-left ml-80 '>
                    <h2 className='text-4xl'>FEEDBACK FOR ARTISTIC DIRECTION</h2>
                    <p className='mt-4 font-medium text-left'>
                      Use emotional analytics as a form of feedback on your artistic direction.
                      Understand which emotional tones are more prevalent and consider adjusting your work accordingly.
                    </p>

                  </div>



                </div>
            </div>

            <div className='w-full h-auto p-8 text-white bgDark'>
              <ul className='flex flex-row justify-center gap-20 mx-auto'>
                <a href="/gallery"><li className='hover:text-emerald-500'>GALLERY</li></a>
                <a href="/home"><li className='hover:text-sky-500'>BACK TO TOP</li></a>
                
                
              </ul>
              <span className='text-xs'>Artization Technology 2023 &#174;</span>
            </div>









        </div>




      </div>
    </>

  )
}

export default HomePage
