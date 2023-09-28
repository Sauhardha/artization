import React from 'react';

function ContactPage() {
  return (
    <>
    <body class="h-screen">
      <div className='bgLogo col-span-4 flex justify-center items-center'>
                        <img src="/ARTIZATION.png" alt="" className='w-80 h-80'/>
                    </div>
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your message"
            rows="4"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button" // Changed type to "button" for the frontend only version
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send
          </button>
        </div>
      </form>
    </div>

    </body>
    
    </>

    
  );
}

export default ContactPage;
