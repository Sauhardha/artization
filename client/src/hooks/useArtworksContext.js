import {ArtworksContext } from '../context/ArtworksContext'
import { useContext } from 'react'

export const useArtworksContext = () => {
    const context = useContext(ArtworksContext)

    // Check within the scope of the context we're trying to use
    // Context Provider wraps the App
    if (!context) {
        throw Error('useArtworksContext must be used inside an ArtworksContextProvider')
    }

    return context
}