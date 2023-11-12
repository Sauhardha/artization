import React from 'react';
import Typed from 'react-typed';
import Laptop from "../images/laptop.jpg"
import Single from "../images/single.png"
import Double from "../images/double.png"
import Triple from "../images/triple.png"
import wisp from '../images/wisp.png';
import logo from '../components/logo.png'



function AboutPage() {
  return (
    <div>
      <div>
        <div>
          <div className="text-white">
            <div className="mx-auto p-8 mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">\

              <h1 className='text-[#00df9a] font-bold p-2 self-start'>GROWING WITH DATA ANALYTICS</h1>
              <h1 className="md:text-7xl self-start sm:text-6xl text-4xl font-bold md:py-6">Grow with data</h1>
              <div className='grid grid-cols-12 items-center'>
                
                <div className='col-span-6'>
                <img src={wisp} alt="facesBackground" className='w-[30vw] h-auto object-cover p-4' />
                </div>

                <div className='col-span-6 text-left'>
                  <p className="md:text-5xl sm:text-4xl text-xl col-span font-bold py-4"> Fast, flexible service for  </p>
                  <Typed className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2' strings={["Artists", "Curators", "SaaS"]} typeSpeed={120} backSpeed={140} loop />
                  <p className='md:text-2xl text-xl font-bold text-gray-500'>Monitor your artwork's emotional analytics to understand your audience's interests</p>
                  <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">Get Started</button>

                </div>

              </div>


            </div>
          </div>

          {/* Grid */}
          <div className="w-full bg-white py-16 px-4">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
              <img className="w-[500px] mx-auto my-4" src={Laptop} alt="/" />
              <div className='flex flex-col justify-center'>
                <p className='text-[#00df9a] font-bold'>DATA ANALYTICS DASHBOARD</p>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Manage Artwork Data Analytics Centrally</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, nihil optio quod est incidunt accusamus repellendus vel sunt iure cupiditate earum aliquam? Voluptatum aliquid esse laborum suscipit vero nemo rem.</p>
                <button className="bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">Get Started</button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className='w-full  py-16 text-white px-4'>
          <div className='max-w-[1024px] mx-auto grid lg:grid-col-3'>
            <div className='lg:col-span-2'>
              <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Want tips & tricks to optimise your flow?</h1>
              <p>Sign up to our newsletter and stay up to date</p>
            </div>
            <div className='my-4'>
              <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                <input className="p-3 flex w-full rounded-md text-black" type="email" placeholder='Enter Email' />
                <button className='bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>Notify Me</button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Cards */}
      <div className='w-full py-[10rem] px-4 bg-white'>
        {/* card 1 */}
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className="w-20 mx-auto mt-[-3rem] bg-white" src={Single} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Single Users</h2>
            <p className='text-center text-4xl font-bold'>$149</p>
            <div className='text-center font-medium'>
              <p className="py-2 border-b mx-8 mt-8">500 GB Storage</p>
              <p className="py-2 border-b mx-8">1 Granted User</p>
              <p className="py-2 border-b mx-8">Send up to 2GB</p>
            </div>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>

          </div>
          {/* card 2 */}
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
            <img className="w-20 mx-auto mt-[-3rem] bg-transparent" src={Double} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Single Users</h2>
            <p className='text-center text-4xl font-bold'>$149</p>
            <div className='text-center font-medium'>
              <p className="py-2 border-b mx-8 mt-8">500 GB Storage</p>
              <p className="py-2 border-b mx-8">1 Granted User</p>
              <p className="py-2 border-b mx-8">Send up to 2GB</p>
            </div>
            <button className=' bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>

          </div>
          {/* card 3 */}
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className="w-20 mx-auto mt-[-3rem] bg-white" src={Triple} alt="/" />
            <h2 className='text-2xl font-bold text-center py-8'>Single Users</h2>
            <p className='text-center text-4xl font-bold'>$149</p>
            <div className='text-center font-medium'>
              <p className="py-2 border-b mx-8 mt-8">500 GB Storage</p>
              <p className="py-2 border-b mx-8">1 Granted User</p>
              <p className="py-2 border-b mx-8">Send up to 2GB</p>
            </div>
            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Start Trial</button>

          </div>



        </div>

      </div>

    </div>





  );

}

export default AboutPage;