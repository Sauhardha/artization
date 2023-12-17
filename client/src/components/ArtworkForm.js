import { useState } from 'react';
import '../styles/index.css';
import { useArtworksContext } from '../hooks/useArtworksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const ArtworkForm = ({onCancel}) => {
  const { dispatch } = useArtworksContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [artist_email, setArtistEmail] = useState('');
  const [rpId, setRpId] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); 
  
  // Error state
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    if (!image) {
        setError('Please select an image to upload');
        return;
    }

    if(!rpId){
        setError('Please provide Raspberry pi ID for painting')
    }
    setLoading(true); 
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('artist_email', artist_email);
    formData.append('RaspID', rpId)
    formData.append('image', image);

    
    try {
      const res = await axios.post(
        'http://13.236.67.134:9090/api/artworks',
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      dispatch({ type: 'CREATE_ARTWORK', payload: res.data });
      setTitle('');
      setDesc('');
      setArtistEmail('');
      setImage(null);
      setEmptyFields([]);
      setError(null);
      onCancel()
    } catch (error) {
      setError(error.response?.data?.error);
    } finally {
      setLoading(false); 
    }
  
  };

  const imageUpload = (e) => {
    const selectedImage = e.target.files[0];
    if(selectedImage){
        setImage(e.target.files[0]);
    }
  };
  

  return (
    <form className="p-8 shadow-2xl create bg-neutral-50 rounded-xl drop-shadow" onSubmit={handleSubmit} >
      <div className="flex justify-end">
        <button
          className="text-gray-700 hover:text-red-500"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
      <h3 className="pb-8 text-xl font-medium tracking-wide text-center border-b-2 headFont">Add a new Artwork</h3>

      <div className="p-4 space-y-4 text-lg">
        <div className="grid grid-cols-2 gap-4">
          <label>Art Title: </label>
          <input
            className={emptyFields.includes('title') ? 'error' : 'p-2 rounded-lg border-2 border-slate-300'}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label>Artist Email: </label>
          <input
            className="p-2 border-2 rounded-lg border-slate-300"
            type="email"
            required
            onChange={(e) => setArtistEmail(e.target.value)}
            value={artist_email}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label>Camera ID: </label>
          <input
            className="p-2 border-2 rounded-lg border-slate-300"
            type="number"
            onChange={(e) => setRpId(e.target.value)}
            value={rpId}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label>Image of painting: </label>
          <input
            className="p-2 border-2 rounded-lg border-slate-300"
            type='file' 
            name='file'
            alt="painting image"
            onChange={imageUpload}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <label>Artwork Description: </label>
          <textarea
            className="p-2 border-2 rounded-lg border-slate-300"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
        </div>

        <button
            className={`p-2 rounded-lg bg-blue-500 hover:bg-emerald-500 w-32 text-white ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <div className="w-5 h-5 mx-auto border-t-2 border-white border-opacity-50 rounded-full animate-spin"></div>
            ) : (
              'Create'
            )}
          </button>
        {error && <div className="error"> {error} </div>}
      </div>
    </form>
  );
};

export default ArtworkForm;
