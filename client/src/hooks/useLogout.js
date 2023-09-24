import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext();

    const logout = () => {

        // Remove user form localStorage
        localStorage.removeItem('user')

        // Dispatch logout action
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}