import { Link } from 'react-router-dom';
import '../styles/index.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

    const {logout} = useLogout()
    const {user} = useAuthContext()

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
                    <div className='p-2'>

                        {user && (
                            <div>
                                <span className='p-2'>{user.email}</span>
                                <button className='border-2 border-red-300 rounded-xl p-2' 
                                onClick={handeClick}>Logout </button>
                            </div>
                        )}
                        
                        {!user && (
                            <div className='space-x-8 p-2'>
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

export default Navbar;