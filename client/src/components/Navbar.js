import { Link } from 'react-router-dom'
import '../styles/index.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import logo from './logo.png'


const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handeClick = () => {
    logout()
  }

  // Function to format the email address
  const formatEmail = (email) => {
    if (!email) return '';
    const parts = email.split('@');
    const firstWord = parts[0];
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  };


  return (
    <header>
      <div className="flex justify-between px-4 headFont light bgDark">
        <Link to="/">
          <img src={logo} alt="logo" className='w-32 invert'/>
        </Link>

        <nav className="flex items-center justify-between w-full linkFont">
          {user && (
            <div className="flex items-center ml-20 gap-8">
              <Link to="/" className="hover:text-emerald-400 transition-colors ease-in-out duration-300">Home</Link>
              <Link to="/gallery" className="hover:text-emerald-400 transition-colors ease-in-out duration-300">Gallery</Link>
              <Link to="/admin" className="hover:text-emerald-400 transition-colors ease-in-out duration-300">Editor</Link>
            </div>
          )}

          <div className="p-2 ml-auto">

            {user && (
              <div className='flex w-80 items-center'>
                <span className="mx-8">Welcome, {formatEmail(user.email)}</span>
                <button className="p-2 border-2 border-none rounded-xl transition ease duration-300 hover:bg-white hover:text-red-500" 
                onClick={handeClick}> Logout{' '} </button>
              </div>
            )}

            {!user && (
              <div className="p-2 space-x-8 flex items-center">
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
