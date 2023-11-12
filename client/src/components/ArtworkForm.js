import { useState } from 'react';
import '../styles/index.css';
import { useArtworksContext } from '../hooks/useArtworksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const ArtworkForm = () => {
  const { dispatch } = useArtworksContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [artist_email, setArtistEmail] = useState('');
  const [rpId, setRpId] = useState('');
  const [image, setImage] = useState(null);
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
    
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('artist_email', artist_email);
    formData.append('RaspID', rpId)
    formData.append('image', image);

    
      const res = await axios.post('http://localhost:8080/api/artworks', formData, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }}).catch((error) => {
            setError(error.response?.data?.error)
        });

        dispatch({ type: 'CREATE_ARTWORK', payload: res.data });
        setTitle('');
        setDesc('');
        setArtistEmail('');
        setImage(null);
        setEmptyFields([]);
        setError(null);
  };

  const imageUpload = (e) => {
    const selectedImage = e.target.files[0];
    if(selectedImage){
        setImage(e.target.files[0]);
    }
  };
  

  return (
    <form className="p-8 create bgLight rounded-xl" onSubmit={handleSubmit} >
      <h3 className="text-4xl font-medium tracking-tight headFont">Add a new Artwork</h3>

      <div className="p-8 space-y-4 text-lg">
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
          <label>Raspberry pi ID: </label>
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

        <button className="p-2 rounded-lg bg5 hover:bg-emerald-500 light">Add Artwork</button>
        {error && <div className="error"> {error} </div>}
      </div>
    </form>
  );
};

export default ArtworkForm;
