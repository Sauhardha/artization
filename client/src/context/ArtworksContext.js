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
                //gallery: [action.payload, ...state.gallery]
            }
        case 'DELETE_ARTWORK':
            return {
                gallery: state.gallery.filter((a) => a._id !== action.payload._id)
            }
        default: 
        return state
    }
}


export const ArtworksContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(artworksReducer, {
        gallery: null
    })


    return (
        <ArtworksContext.Provider value={{...state, dispatch}}>
            { children }
        </ArtworksContext.Provider>
    )
}


