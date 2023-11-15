import React, { useState } from 'react';
import '../styles/index.css';
import { useSignup } from '../hooks/useSignup';
import signupBG from '../images/signupBg.jpg';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Pass firstName and lastName to the signup function
    await signup({ firstName, lastName, email, password });
    window.location.replace('/welcome')
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center h-screen bg-cover bg-center w-full" style={{ backgroundImage: `url(${signupBG})` }}>
      
      <div className="flex flex-col items-center justify-center h-[35rem] p-0 mt-4 bg-white rounded-xl shadow-md">
        <div className="grid w-auto grid-cols-2 gap-16 p-8">
          <img src="/images/userPotential.png" alt="" className="self-center h-40 md:w-96 md:h-72 w-72" />

          <div className="my-4 w-80">
            <h1 className="mb-4 text-2xl dark headFont">Create an Account</h1>
            <form className="login" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block dark">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-logo focus:outline-none focus:border-emerald-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block dark">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-logo focus:outline-none focus:border-emerald-300"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block dark">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-logo focus:outline-none focus:border-emerald-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block dark">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-logo focus:outline-none focus:border-emerald-300"
                  required
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Sign Up
              </button>
              <div className="p-2">
                <span className="text-blue-400">
                  <a href="/login">Have an Account? Log in.</a>
                </span>
              </div>
              {error && <span className="text-lg">{error}</span>}
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Signup;
