import '../styles/index.css';
import { useArtworksContext } from '../hooks/useArtworksContext';
import {useAuthContext} from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
 
// Date-fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'
 
const ArtworkDetails = ({ artwork, isAdminView }) => {
 
    const { dispatch } = useArtworksContext()
    const {user} = useAuthContext()
 
    const handleClick = async () => {
        if (!user){
          return
        }
 
        const response = await fetch('http://localhost:8080/api/artworks/' + artwork._id, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
 
        if (response.ok) {
            dispatch({type: 'DELETE_ARTWORK', payload: json})
        }
    }
 
    return (
      <Link
  className="relative w-auto h-80 p-6 text-left shadow-lg bg-zinc-800 hover:shadow-slate-700 transition-transform transform hover:-translate-y-1"
  to={`/artwork/${artwork._id}`}
>
  <div className="card flex flex-col">
    <h4 className="text-xl headFont">{artwork.title}</h4>
    <span className="text-sm font-medium">
      {artwork.desc.length > 100
        ? `${artwork.desc.slice(0, 100)}...`
        : artwork.desc}
    </span>
    <span className="text-sm headFont c3">{artwork.stat}</span>
    <img
      src={`http://localhost:8080${artwork.imageURL}`}
      alt="artwork"
      className="w-full h-40 object-cover rounded-md mt-4"
    />

      <span
        className="absolute top-4 right-4 w-8 h-8 text-xl text-center bg-gray-300 rounded-full cursor-pointer hover:bg-red-300"
        style={{
          backgroundColor:
            artwork.stat === 'Happy'
              ? 'yellow'
              : artwork.stat === 'Sad'
              ? 'blue'
              : artwork.stat === 'Excited'
              ? 'purple'
              : artwork.stat === 'Angry'
              ? 'red'
              : 'gray', // Default color or any other fallback
        }}
        onClick={handleClick}
      >
        &nbsp; {/* This is a non-breaking space to ensure the circle is visible */}
      </span>
      {isAdminView && (
    <span className='w-8 mt-4 text-xl text-center text-red-500 rounded-full cursor-pointer material-symbols-outlined admin-only-del hover:bg-red-100' onClick={handleClick}>DELETE</span>
  )}
    
  </div>
</Link>

    )
  }

 
export default ArtworkDetails