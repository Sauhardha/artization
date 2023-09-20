import React from 'react';
import '../styles/index.css';


function LoginPage() {


    return (
        <>
            <body class=" h-screen">
                <div className='grid grid-cols-12 h-screen'>


                    {/* Artization logo on left of page */}
                    <div className='bgLogo col-span-4 flex justify-center items-center'>
                        <img src="/ARTIZATION.png" alt="" className='w-80 h-80'/>
                    </div>

                    {/* Login box on right of page */}
                    <div class="bg-stone-200 col-span-8 p-8 rounded shadow-md flex justify-center items-center">

                        
                        <div className='w-96'>
                            <h1 class="text-2xl dark headFont mb-4">Log In</h1>
                            <form>
                                <div class="mb-4">
                                    <label for="email" class="block dark">Username</label>
                                    <input type="username" id="username" name="username" class="w-full bgLogo border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-300" required></input>
                                </div>
                                <div class="mb-6">
                                    <label for="password" class="block dark">Password</label>
                                    <input type="password" id="password" name="password" class="w-full bgLogo border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-300" required></input>
                                </div>
                                <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-blue-300">
                                    Submit
                                </button>
                            </form>
                        </div>








                    </div>
                </div>

            </body>

        </>
    )
}

export default LoginPage;