import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch } = useAuthContext()

    const signup = async (firstName, lastName, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8080/api/auth/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firstName, lastName, email, password})
            
        })


        if (!response.status === 200) {
            setIsLoading(false)
            // setError(json.error)
        }
        if (response.ok) {
        const json = await response.json();

    
            // Save the user to local storage JWT
            // userController in backend uses (user, token)
            localStorage.setItem('user', JSON.stringify(json))

            // Update AuthContext
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
}