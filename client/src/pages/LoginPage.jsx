import React from 'react';
import '../styles/index.css';
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom'; 
import { useAuthContext } from '../hooks/useAuthContext';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin();
    const navigate = useNavigate(); 
    const { user } = useAuthContext();

    // Check if the user is already logged in, and redirect to the homepage
    if (user) {
        navigate('/home');
        return null; // Return null to prevent rendering the login form
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)

        // Redirect to the HomePage after successful login
        navigate('/home');
    }

    return (
        <div className='flex  justify-center h-max bgDark'>
            <div className="flex flex-col items-center justify-center h-[35rem] p-12 mt-4 mx-12 bg-white rounded-xl shadow-md">
                <div className='grid grid-cols-6 gap-4 '>
                    <div className='col-span-0'>
                        
                    </div>


                    <div className='col-span-6'>
                        {/* Logo */}
                        <div className='flex items-center justify-center w-max'>
                            <div className='text-4xl headFont'>
                                <span className='c2'>Art</span> <br></br>
                                <p> <span className='c4'>Work</span>ing for you</p>
                            </div>
                        </div>

                        {/* Login Form */}
                        <div className='grid w-auto grid-cols-2 gap-16 p-8 '>
                            <img src="/images/aiFace.png" alt="" className='w-64 h-80' />

                            <div className='w-auto my-0'>
                                <h1 className="mb-4 text-2xl dark headFont">Log in</h1>
                                <form className='login' onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label for="email" class="block dark">Email</label>
                                        <input type="email" id="username" name="username" onChange={(e) => setEmail(e.target.value)} value={email}
                                            className="w-full px-3 py-2 border border-gray-300 rounded bg-logo focus:outline-none focus:border-emerald-300" required></input>
                                    </div>
                                    <div className="mb-6">
                                        <label for="password" class="block dark">Password</label>
                                        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}
                                            className="w-full px-3 py-2 border border-gray-300 rounded bg-logo focus:outline-none focus:border-emerald-300" required></input>
                                    </div>
                                    <button disabled={isLoading} type="submit" class="w-full bg-blue-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-blue-300">
                                        Log in
                                    </button>
                                    <div className='p-2'>
                                        <span>Or </span>
                                        <span className="text-blue-400"><a href="/signup">Create an Account.</a></span>
                                    </div>
                                    {error && <span className='text-lg'>{error}</span>}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login;
