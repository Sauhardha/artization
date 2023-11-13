import React from 'react';
import Laptop from "../images/laptop.jpg"
import Single from "../images/single.png"
import Double from "../images/double.png"
import Triple from "../images/triple.png"
import aboutArt from '../images/aboutArt.jpg';
import logo from '../components/logo.png'
import FaqSection from '../components/FaqSection';



function AboutPage() {
  return (
    <div>

      <div>
        <div className='bgDark'>
        <a href='/login'>
              <button className='w-20 m-8 text-white h-auto rounded-lg text-3xl hover:bg-emerald-500 ease duration-300'>
                &larr;
              </button>
            </a>
          <div className="text-white md:p-16 p-2 ">
            
            <div className="mx-auto p-8 mt-[-96px] w-full h-auto mx-auto text-center flex flex-col justify-center">
              <img src={logo} alt="logo" className='lg:w-40 w-72 md:pt-0 pt-32 lg:self-start self-center invert' />
              <h1 className='c3 font-bold p-2 tracking-wide self-start'>GROWING WITH DATA ANALYTICS</h1>
              <h1 className="md:text-7xl self-start tracking-tight text-3xl font-bold md:py-6">ABOUT US</h1>


              <div className='grid md:grid-cols-12 grid-cols-1 gap-8 items-center'>

                <div className='col-span-6'>
                  <img src={aboutArt} alt="facesBackground" className='lg:w-[40vw] w-full border-8 border-white h-auto object-cover' />
                </div>

                <div className='col-span-6 text-left'>
                  <p className="md:text-5xl sm:text-4xl text-xl col-span font-bold py-4">A fast, flexible service for</p>
                  <p className='md:text-5xl sm:text-4xl text-xl font-bold' typeSpeed={120} backSpeed={140} loop> Artists and Curators </p>
                  <p className='md:text-2xl text-xl font-bold text-gray-500 pt-12'>Monitor your artwork's emotional analytics to understand your audience's interests</p>
                  <button className="bg3 w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-blue-500 hover:text-white">Get Started</button>

                </div>

              </div>


            </div>
          </div>

          {/* Grid */}
          <div className="w-full bg-white py-16 px-4">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
              <img className="w-[500px] mx-auto my-12" src={Laptop} alt="/" />
              <div className='flex flex-col justify-center order-first'>
                <p className='text-emerald-500 text-7xl font-bold mb-16'>A NEW WAY OF CURATING</p>
                <h1 className='md:text-xl text-xl font-bold py-2'>Manage Artwork Data Analytics Centrally</h1>
                <p className='text-lg'>Welcome to Artization, where the convergence of art and technology transforms the gallery experience.
                  Our innovative app employs on-site cameras & AI facial scanning to
                  capture the nuanced interactions between audiences and artworks. Unveil the secrets of viewer
                  engagement with detailed visual and behavioral analytics, presented in our intuitive interface.
                  Explore real-time data, gain insights into audience reactions, and revolutionise the way you perceive and curate art. <br /><br />
                  Artization — Bridging the gap between art and analytics, one frame at a time.</p>
                <button className="bg-black c3 w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 hover:bg-blue-500 hover:text-white">Get Started</button>
              </div>
            </div>
          </div>
        </div>


      </div>


      <FaqSection />


      {/* Cards */}
      <div className='w-full py-[10rem] px-4 bg-white'>
        {/* card 1 */}
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>

          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className="w-20 mx-auto mt-[-2rem] bg-white" src={Single} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Viewer</h2>
            <p className='text-center text-4xl font-bold'>$XX</p>
            <div className='text-center font-medium'>
              <p className="py-2 border-b mx-8 mt-8">See what's trending</p>
              <p className="py-2  mx-8">Network with Curators</p>
              <p className="py-2  mx-8"> & Artists</p>
            </div>
            <button className='bg3 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-blue-500 hover:text-white'>Start Trial</button>

          </div>

          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className="w-20 mx-auto mt-[-2rem] bg-white" src={Double} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Artist Plan</h2>
            <p className='text-center text-4xl font-bold'>$XX</p>
            <div className='text-center font-medium'>
              <p className="py-2 border-b mx-8 mt-8">Access to Analytics</p>
              <p className="py-2 border-b mx-8">1 Granted User</p>
              <p className="py-2 border-b mx-8">Track all your artwork</p>
            </div>
            <button className='bg3 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-blue-500 hover:text-white'>Start Trial</button>

          </div>

          {/* card 3 */}
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className="w-20 mx-auto mt-[-3rem] bg-white" src={Triple} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Curator Plan</h2>
            <p className='text-center text-4xl font-bold'>$XX</p>
            <div className='text-center font-medium'>
              <p className="py-2 border-b mx-8 mt-8">Curate Art with Data</p>
              <p className="py-2 border-b mx-8">1 Gallery Acess</p>
              <p className="py-2 border-b mx-8">Track your Gallery</p>
            </div>
            <button className='bg3 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 hover:bg-blue-500 hover:text-white'>Start Trial</button>

          </div>



        </div>

      </div>






      {/* Newsletter */}
      <div className='w-full bgLight py-16 text-black px-4 text-center'>
        <div className='max-w-[1024px] mx-auto grid grid-cols-1'>
          <div className='lg:col-span-2'>
            <h1 className='sm:text-7xl text-4xl font-bold py-4'>REACH OUT TO US</h1>
            <p>Sign up to our newsletter and stay up to date</p>
          </div>
          <div className='m-10'>
            <div className='flex flex-col items-center justify-center w-full'>
              <input className="p-3 flex w-96 rounded-md text-black" type="email" placeholder='Enter Email' />
              <button className='bg3 text-black rounded-md font-medium w-96 hover:bg-blue-400 hover:text-white my-6 px-6 py-3'>Notify Me</button>
            </div>

          </div>
        </div>

      </div>

    </div>





  );

}

export default AboutPage;