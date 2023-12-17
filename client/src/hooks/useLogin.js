import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import { useNavigate } from 'react-router-dom'; 




export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch } = useAuthContext()
    const navigate = useNavigate(); 


    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://13.236.67.134:9090/api/auth/login', {
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

            
                    if (json) {
                        if (json.permissions.length > 0) {
                            navigate('/home');
                        } else {
                            navigate('/welcome');
                        }
                    }
                
            
            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}