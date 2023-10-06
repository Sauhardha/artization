import '../styles/index.css';
import { useArtworksContext } from '../hooks/useArtworksContext';

const ArtworkDetails = ({ artwork, isAdminView }) => {

    const { dispatch } = useArtworksContext()

    const handleClick = async () => {
        const response = await fetch('http://localhost:8080/api/artworks/' + artwork._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ARTWORK', payload: json})
        } 
    }

    return (
      <div className="artwork-details bg-zinc-800 rounded-lg shadow-slate-950 shadow-lg flex flex-col justify-between p-6 hover:shadow-slate-700 text-left w-auto">
        <h4 className='headFont text-xl'>{artwork.title}</h4>
        <span className='font-medium text-sm'>{artwork.desc}</span>
        <span className='headFont c1 text-sm'>{artwork.stat}</span>
        <span className='headFont c3 text-xs'>{artwork.createdAt}</span>
        {isAdminView && (
          <span className='admin-only-del text-xs text-red-500 bg-gray-300 rounded-lg cursor-pointer text-center w-20 mt-2 hover:bg-red-300' onClick={handleClick}>DELETE</span>
        )}
      </div>
    )
  }
export default ArtworkDetails