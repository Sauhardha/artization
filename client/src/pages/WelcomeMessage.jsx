import React from 'react';
import Navbar from '../components/Navbar';

const WelcomeMessage = () => {
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-start h-screen py-8 bg-gray-100 md:px-16 sm:px-3">
      
      <h1 className="mb-4 text-3xl font-bold">
        Welcome to the Artization portal!
      </h1>
      <p className="mb-8 text-gray-600">
        You're not currently connected to any Gallery
      </p>
      <div className="text-left ">
        <p className="mb-4">
          To establish a connection to a Gallery:
        </p>
        <ul className="mb-4 list-disc list-inside">
          <li className="mb-2">
            Please contact the Gallery and ask them to invite you.
          </li>
          <li>
            If you are the owner of a Gallery, please contact Artization sales team by email (<span className="text-blue-500">sales@artization.com</span>) or call our support line on <span className="text-blue-500">02 9352 1000</span> to create your company account.
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default WelcomeMessage;
