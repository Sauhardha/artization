import React from 'react';
import '../styles/index.css';
import {useState} from 'react'
import { useSignup } from '../hooks/useSignup';


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password);
    }

    return (
        <>
            <body class=" h-screen">
                <div className='grid h-screen grid-cols-12'>


                    {/* Artization logo on left of page */}
                    <div className='flex items-center justify-center col-span-4 bgLogo'>
                        <img src="/ARTIZATION.png" alt="" className='w-80 h-80'/>
                    </div>

                    {/* Login box on right of page */}
                    <div class="bg-stone-200 col-span-8 p-8 rounded shadow-md flex justify-center items-center">

                        
                        <div className='w-96'>
                            <h1 className="mb-4 text-2xl dark headFont">Create Account</h1>
                            <form className='signup' onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label for="email" class="block dark">Email</label>
                                    <input type="email" id="username" name="username" onChange={(e) => setEmail(e.target.value)} value={email}
                                    className="w-full px-3 py-2 border border-gray-300 rounded bgLogo focus:outline-none focus:border-emerald-300" required></input>
                                </div>
                                <div class="mb-6">
                                    <label for="password" class="block dark">Password</label>
                                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}
                                    className="w-full px-3 py-2 border border-gray-300 rounded bgLogo focus:outline-none focus:border-emerald-300" required></input>
                                </div>
                                <button  type="submit" disabled={isLoading} class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-blue-300">
                                    Sign up
                                </button>
                                {error && <div className='flex text-lg text-red-500 linkFont'><p>Error</p></div>}
                            </form>
                        </div>
                    </div>
                </div>

            </body>

        </>
    )

}

export default Signup;