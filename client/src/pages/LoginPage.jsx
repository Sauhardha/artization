import React from 'react';
import '../styles/index.css';
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <div className='h-screen flex justify-center items-center bgDark'>
            <div className="bg-white p-8 rounded shadow-md flex flex-col justify-center items-center">
                {/* Logo */}
                <div className=' flex justify-center items-center w-max'>
                    <img src="/ARTIZATION.png" alt="" className='w-40 h-40' />
                </div>

                {/* Login Form */}
                <div className=' p-8 grid grid-cols-2 gap-8 w-auto'>
                    <img src="/images/aiFace.png" alt="" className='w-64 h-80' />

                    <div className='w-auto my-4'>
                        <h1 className="text-2xl dark headFont mb-4">Log in</h1>
                        <form className='login' onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label for="email" class="block dark">Email</label>
                                <input type="email" id="username" name="username" onChange={(e) => setEmail(e.target.value)} value={email}
                                    className="w-full bg-logo border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-300" required></input>
                            </div>
                            <div className="mb-6">
                                <label for="password" class="block dark">Password</label>
                                <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}
                                    className="w-full bg-logo border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-300" required></input>
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
    )
}

export default Login;
