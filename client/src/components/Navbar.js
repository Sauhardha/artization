import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import '../styles/index.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import logo from './logo.png'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  const [dropdownVisible, setDropdownVisible] = useState(false)

  return (
    <header>
      <div className="flex justify-between px-4 headFont light bgDark">
        <Link to="/home">
          <img src={logo} alt="logo" className="w-32 invert" />
        </Link>

        <nav className="flex items-center justify-between w-full linkFont">
          {user && user.permissions.length > 0 && (
            <div className="flex items-center gap-8 ml-20">
              <Link
                to="/home"
                className="transition-colors duration-300 ease-in-out hover:text-emerald-400"
              >
                Home
              </Link>
              {user &&
                (user.permissions.includes('artist') ||
                  user.permissions.includes('curator') ||
                  user.permissions.includes('admin')) && (
                  <Link
                    to="/gallery"
                    className="transition-colors duration-300 ease-in-out hover:text-emerald-400"
                  >
                    Gallery
                  </Link>
                )}

              {user &&
                (user.permissions.includes('curator') ||
                  user.permissions.includes('admin')) && (
                  <Link
                    to="/admin"
                    className="transition-colors duration-300 ease-in-out hover:text-emerald-400"
                  >
                    Editor
                  </Link>
                )}

              {user.permissions.includes('admin') && (
                <div
                  className="relative group"
                  onMouseEnter={() => setDropdownVisible(true)}
                >
                  <Link className="transition-colors duration-300 ease-in-out hover:text-emerald-400">
                    Administration
                  </Link>
                  <ul
                    className={`absolute space-y-2 mt-2 bg-white border border-gray-200 w-40 left-0 z-10 text-gray-700 ${
                      dropdownVisible ? 'block' : 'hidden'
                    }`}
                    onMouseEnter={() => setDropdownVisible(true)}
                    onMouseLeave={() => setDropdownVisible(false)}
                  >
                    <li>
                      <Link
                        to="/users"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/galleries"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Galleries
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="p-2 ml-auto">
            {user && (
              <div className="flex items-center w-80">
                <span className="mx-8">Welcome, {user.firstName}</span>
                <button
                  className="p-2 transition duration-300 border-2 border-none rounded-xl ease hover:bg-white hover:text-red-500"
                  onClick={handleClick}
                >
                  {' '}
                  Logout{' '}
                </button>
              </div>
            )}

            {!user && (
              <div className="flex items-center p-2 space-x-8">
                <Link to="/login">Login</Link>
                <Link to="/about">About Us</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
