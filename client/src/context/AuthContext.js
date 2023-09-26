import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()


// Login is user -> payload from JWT
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return {user: null}
        default: 
            return state
    }
}

// Default is user is not logged in
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // Checking if there is a user in the localStorage (is signed in)
    useEffect (() => {
        const user = JSON.parse(localStorage.getItem('user'))

        // If yes value for user is object with email and token
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}