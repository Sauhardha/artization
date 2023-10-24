import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8081/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
            
        })


        if (!response.status === 200) {
            setIsLoading(false)
            // setError(json.error)
        }
        if (response.ok) {
        const json = await response.json()
            // Save the user to local storage JWT
            // userController in backend uses (user, token)
            localStorage.setItem('user', JSON.stringify(json))

            //Update AuthContext
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}