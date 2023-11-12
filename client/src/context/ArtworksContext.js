import {createContext, useReducer} from 'react'

export const ArtworksContext = createContext()

// Keeps page in sync with DB without refresh


export const artworksReducer = (state, action) => {

    switch (action.type) {
        case 'SET_ARTWORKS':
        return {
            gallery: action.payload
        }
        case 'CREATE_ARTWORK':
            return {
                gallery: { artworks: [action.payload, ...state.gallery.artworks], gallery: state.gallery.gallery}
            }
        case 'DELETE_ARTWORK':
            return {
                gallery: { artworks: state.gallery.artworks.filter((a) => a._id !== action.payload._id), gallery: state.gallery.gallery}
            }
        default: 
        return state
    }
}


export const ArtworksContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(artworksReducer, {
        gallery: {artworks: [], gallery: {}}
    })


    return (
        <ArtworksContext.Provider value={{...state, dispatch}}>
            { children }
        </ArtworksContext.Provider>
    )
}


