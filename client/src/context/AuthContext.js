import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()



export const axiosInstance = axios.create({
    baseURL: 'http://13.236.67.134:9090/api',
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  })

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
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
      user: null,
    });
  
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
  
      const checkPermissions = async () => {
        try {
          const response = storedUser && (await axiosInstance.get(`/user/permissions/${storedUser.id}`));
  
          if (response && response.data) {
            const updatedUser = { ...storedUser, permissions: response.data };
            localStorage.setItem('user', JSON.stringify(updatedUser)); 
            dispatch({ type: 'LOGIN', payload: updatedUser });
          }
        } catch (error) {
          console.log('Error fetching permissions:', error);
        }
      };
  
      if (storedUser) {
        checkPermissions();
      } else {
        console.log('No user found in localStorage');
      }
    }, []);
  
  
    return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };