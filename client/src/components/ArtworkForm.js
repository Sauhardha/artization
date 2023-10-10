import {useState} from 'react'
import '../styles/index.css'
import { useArtworksContext } from '../hooks/useArtworksContext';
import {useAuthContext} from '../hooks/useAuthContext';


const ArtworkForm = () => {
    const {dispatch} = useArtworksContext()
    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [stat, setStat] = useState('')
    // Error state
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user){
            setError('You must be logged in')
            return
        }

        const artwork = {title, desc, stat}


        // Fetch request to post new data
        const response = await fetch('http://localhost:8080/api/artworks', {
            method: 'POST',
            body: JSON.stringify(artwork), 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            // Reset form data
            setTitle('')
            setDesc('')
            setStat('')

            setEmptyFields([])

            setError(null)
            console.log('new artwork added', json)
            dispatch({type: 'CREATE_ARTWORK', payload: json})
        }
    }


    return (
        
        <form className='create bgLight p-8 rounded-xl' onSubmit={handleSubmit}>
            <h3 className='headFont text-4xl tracking-tight font-medium'>Add a new Artwork</h3>

            <div className='space-y-4 text-lg p-8 '>
                <div className='grid grid-cols-2 gap-4'>
                <label>Art Title: </label>
                <input
                    className= {emptyFields.includes('title') ? 'error' : 'p-2 rounded-lg border-2 border-slate-300' }    
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                </div>
                

                <div className='grid grid-cols-2 gap-4'>
                <label>Artwork Description: </label>
                <input
                    className='p-2 rounded-lg border-2 border-slate-300'
                    type='text'
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                />
                </div>
                

                <div className='grid grid-cols-2 gap-4'>
                <label>Emotion Status: </label>
                <input
                    className='p-2 rounded-lg  border-2 border-slate-300'
                    type='text'
                    onChange={(e) => setStat(e.target.value)}
                    value={stat}
                />
                </div>
                
            
            
                <button className='bg5 hover:bg-emerald-500 light p-2 rounded-lg'>Add Artwork</button>
                {error && <div className='error'> {error} </div>}
            </div>
            
        </form>
    )
}

export default ArtworkForm