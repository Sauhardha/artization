import { useAuthContext } from "./useAuthContext"
import { useArtworksContext } from "./useArtworksContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const { dispatch: artworksDispatch } = useArtworksContext()
 
    const logout = () => {

        // Remove user form localStorage
        localStorage.removeItem('user')

        // Dispatch logout action
        dispatch({type: 'LOGOUT'})
        // Clearing global artworks state
        artworksDispatch({type: 'SET_ARTWORKS', payload: null})
    }

    return {logout}
}