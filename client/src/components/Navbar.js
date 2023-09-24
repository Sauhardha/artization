import { Link } from 'react-router-dom';
import '../styles/index.css';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {

    const {logout} = useLogout()

    const handeClick = () => {
        logout()
    }
    
    return (
        <header>
            <div className='flex justify-between headFont'>
                <Link to='/'>
                    <h1 className='p-4'>Dev-Navbar /</h1>
                </Link>
                <nav className='flex justify-between linkFont '>
                    <div className='space-x-8 p-2'>
                        <button className='border-2 border-red-300 rounded-xl p-2' 
                        onClick={handeClick}>Logout </button>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>           
                </nav>
            </div>
        </header>
    )
}

export default Navbar;