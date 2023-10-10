import React from 'react';
import '../styles/index.css';
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <div className='flex items-center justify-center h-max bgDark'>
            <div className="flex flex-col items-center justify-center h-[35rem] p-0 mt-4 bg-white rounded-xl shadow-md">
                {/* Logo */}
                {/* <div className='flex items-center justify-center w-max'>
                    <img src="/ARTIZATION.png" alt="" className='w-40 h-40' />
                </div> */}

                {/* Login Form */}
                <div className='grid w-auto grid-cols-2 gap-16 p-8'>
                    <img src="/images/userPotential.png" alt="" className='self-center h-40 md:w-96 md:h-72 w-72 ' />

                    <div className='w-80 my-4'>
                        <h1 className="mb-4 text-2xl dark headFont">Create an Account</h1>
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
                                Sign Up
                            </button>
                            <div className='p-2'>
                                <span className="text-blue-400"><a href="/login">Have an Account? Log in.</a></span>
                            </div>
                            {error && <span className='text-lg'>{error}</span>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
