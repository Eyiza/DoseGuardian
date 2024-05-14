'use client'
import Cookies from 'js-cookie';
import { createContext, useState, useContext, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import {useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter()
    useEffect(() => {
      const token = Cookies.get('user')
        if (token){
            const userDecode = jwt.decode(token)
            setUser(userDecode)
        }
        else{
            router.push('/')
        }
    }, [])
    
    
  const login = (userData) => {
    // Your login logic here
    setUser(userData);
  };

  const logout = () => {
    // Your logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}