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

        const response = await fetch('http://localhost:8081/api/artworks/' + artwork._id, {
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
      <div className="artwork-details bg-zinc-800 rounded-lg shadow-slate-950 shadow-lg flex h-80 flex-col justify-end p-6 hover:shadow-slate-700 text-left w-60">
        <h4 className='headFont text-xl'>{artwork.title}</h4>
        <span className='font-medium text-sm'>{artwork.desc}</span>
        <span className='headFont c1 text-sm'>{artwork.stat}</span>
        <span className='headFont c3 text-xs'>{formatDistanceToNow(new Date(artwork.createdAt), {addSuffix: true})}</span>
        {isAdminView && (
          <span className='w-8 mt-2 text-xl text-center text-red-500 bg-gray-300 rounded-full cursor-pointer material-symbols-outlined admin-only-del hover:bg-red-300' onClick={handleClick}>DELETE</span>
        )}
      </Link>
    )
  }
export default ArtworkDetails