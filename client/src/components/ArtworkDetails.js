import { useState } from 'react';
import '../styles/index.css';
import { useArtworksContext } from '../hooks/useArtworksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const ArtworkDetails = ({ artwork, isAdminView }) => {
  const { dispatch } = useArtworksContext();
  const { user } = useAuthContext();
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      'http://54.226.113.32:9090/api/artworks/' + artwork._id,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_ARTWORK', payload: json });
    }

    // Reset deleteClicked after successful deletion
    setDeleteClicked(false);
  };

  const toggleDeleteClick = () => {
    if (!deleteClicked) {
      // On the first click, set deleteClicked to true
      setDeleteClicked(true);
    } else {
      // On the second click, handle the deletion
      handleDeleteClick();
    }
  };

  return (
    <div className="flex flex-col justify-between w-auto gap-3 p-6 text-left text-black rounded-lg shadow-xl artwork-details ease duration-300 bg-neutral-200 bg-opacity-30 backdrop-filter backdrop-blur-md shadow-slate-400 hover:shadow-slate-600">
      <Link to={`/artwork/${artwork._id}`} className="text-decoration-none">
        <h4 className="text-2xl headFont tracking-wide">{artwork.title}</h4>
        <span className="text-sm font-medium">
          {artwork.desc.length > 100
            ? `${artwork.desc.slice(0, 100)}...`
            : artwork.desc}
        </span>
        <span className="text-sm headFont c1">{artwork.stat}</span>
        {/* <span className='text-xs headFont c3'>{formatDistanceToNow(new Date(artwork.createdAt), {addSuffix: true})}</span> */}
        <img
          src={`http://54.226.113.32:9090${artwork.imageURL}`}
          alt="artwork"
          className="mt-4 h-52 w-auto mx-auto box-shadow shadow-xl border-4 border-black"
        />
      </Link>
      {isAdminView && (
        <span
          className={`w-8 mt-2 text-xl text-center ${
            deleteClicked ? 'text-white bg-black hover:w-32 hover:bg-black hover:text-white' : 'text-red-500 bg-gray-300 hover:bg-red-500'
          } rounded-full ease duration-300 cursor-pointer material-symbols-outlined admin-only-del hover:w-20`}
          onClick={toggleDeleteClick}
        >
          {deleteClicked ? 'DELETE' : 'DELETE'}
        </span>
      )}
    </div>
  );
};

export default ArtworkDetails;
