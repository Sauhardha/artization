import { Link } from 'react-router-dom'
import '../styles/index.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import logo from './logo.svg'
const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handeClick = () => {
    logout()
  }

  return (
    <header className='py-4'>
      <div
        className="flex justify-between px-4 headFont"
      >
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <nav className="flex items-center justify-between w-full linkFont">
          <div className="flex justify-center w-4/5 gap-4 md:gap-20 ">
            <Link to="/gallery">GALLERY</Link>
            <Link to="/">HOME</Link>
            <Link to="/about-us">ABOUT US</Link>
          </div>
          <div className="p-2">
            {user && (
              <div>
                <span className="p-2">{user.email}</span>
                <button
                  className="p-2 border-2 border-red-300 rounded-xl"
                  onClick={handeClick}
                >
                  Logout{' '}
                </button>
              </div>
            )}

            {!user && (
              <div className="p-2 space-x-8">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
