import React from 'react';
import '../styles/index.css';
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import logo from '../components/logo.png'
import facesBg from '../images/faces.png';


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
    }

    return (
        <div className='flex  justify-center h-max bgDark grid grid-cols-12'>

            <div className='col-span-4'>
                <div className="flex flex-col items-left pl-10 justify-start h-screen bg-stone-100 shadow-md">
                    <div className='grid'>




                        <div className=''>
                            {/* Logo */}
                            <img src={logo} alt="logo" className='w-36' />


                            <div className='flex w-max'>
                                <div className='text-4xl bodyFont'>
                                    <span className='c2'></span> <br></br>
                                    <span className='text-emerald-500 tracking-tighter font-medium'>Log in to your account</span>
                                </div>
                            </div>

                            <div className='py-6 text-lg font-bold'>
                                <span>Don't have an account? </span> 
                                <span className="text-blue-600"><a href="/signup">Create One.</a></span> {/* Signup page in this href */}
                            </div>

                            {/* Login Form */}
                            <div className='grid w-80 grid-cols-2 gap-2 '>
                                {/*  <img src="/images/aiFace.png" alt="" className='w-64 h-80' /> */}

                                <div className='w-80 my-0'>

                                    <form className='login text-sm' onSubmit={handleSubmit}>
                                        <div className="mb-10">
                                            <label for="email" className="block dark font-medium">Email Address</label>
                                            <input type="email" id="username" name="username" onChange={(e) => setEmail(e.target.value)} value={email}
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-logo focus:outline-none focus:border-emerald-300" required></input>
                                        </div>
                                        <div className="mb-12">
                                            <label for="password" class="block dark font-medium">Password</label>
                                            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}
                                                className="w-full px-3 py-2 border border-gray-300 rounded bg-logo focus:outline-none focus:border-emerald-300" required></input>
                                        </div>
                                        <button disabled={isLoading} type="submit" class="w-32 bg-blue-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded focus:outline-none focus:ring focus:ring-blue-300">
                                            Log in
                                        </button>

                                        {error && <span className='text-lg'>{error}</span>}
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="col-span-8 bg-cover bg-center h-screen flex flex-col justify-between bg-white">
                <div className="self-start pl-12 text-cyan-800">
                    <h3 className='font-semibold  tracking-tight headFont pt-20 text-4xl'>Artization V1.0 is here</h3>
                    <p className='w-72 pt-4 headFont '>
                        Use the power of AI to retrieve analytics on your art.
                        See the data of facial responses to your work, in real-time.
                    </p>

                    <a href='/about'><button className=' pt-4 border-b ease-in-out duration-300 hover:tracking-wider font-medium'> Learn More &rarr;</button></a>
                </div>



                <div className="self-end">
                    <img src={facesBg} alt="facesBackground" className='w-full h-auto object-cover p-4' />
                </div>
            </div>




        </div>
    )
}

export default Login;
