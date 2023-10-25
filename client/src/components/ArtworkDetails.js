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
      <Link className="flex flex-col justify-between w-auto h-80 gap-3 p-6 text-left rounded-lg shadow-lg artwork-details bg-zinc-800 shadow-slate-950 hover:shadow-slate-700" to={`/artwork/${artwork._id}`}>
        <h4 className='text-xl headFont'>{artwork.title}</h4>
        <span className='text-sm font-medium'>{artwork.desc.length > 100 ? `${artwork.desc.slice(0, 100)}...` : artwork.desc}</span>
        <span className='text-sm headFont c1'>{artwork.stat}</span>
        {/* <span className='text-xs headFont c3'>{formatDistanceToNow(new Date(artwork.createdAt), {addSuffix: true})}</span> */}
        <img src={`http://localhost:8080${artwork.imageURL}`} alt='artwork' className='mt-auto'/>
        {isAdminView && (
          <span className='w-8 mt-2 text-xl text-center text-red-500 bg-gray-300 rounded-full cursor-pointer material-symbols-outlined admin-only-del hover:bg-red-300' onClick={handleClick}>DELETE</span>
        )}
      </Link>
    )
  }
export default ArtworkDetails