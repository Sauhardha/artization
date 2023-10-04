import React from 'react';
import '../styles/index.css';
import {useState} from 'react'
import { useLogin } from '../hooks/useLogin';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async(e) => {
        e.preventDefault()

        await login(email, password)
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
                    <div className="flex items-center justify-center col-span-8 p-8 rounded shadow-md bg-stone-200">

                        
                        <div className='w-96'>
                            <h1 className="mb-4 text-2xl dark headFont">Log in</h1>
                            <form className='login' onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label for="email" class="block dark">Email</label>
                                    <input type="email" id="username" name="username" onChange={(e) => setEmail(e.target.value)} value={email}
                                    className="w-full px-3 py-2 border border-gray-300 rounded bgLogo focus:outline-none focus:border-emerald-300" required></input>
                                </div>
                                <div className="mb-6">
                                    <label for="password" class="block dark">Password</label>
                                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}
                                    className="w-full px-3 py-2 border border-gray-300 rounded bgLogo focus:outline-none focus:border-emerald-300" required></input>
                                </div>
                                <button disabled={isLoading} type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-blue-300">
                                    Log in
                                </button>
                                {error && <div className='text-lg'>{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>

            </body>

        </>
    )

}

export default Login;