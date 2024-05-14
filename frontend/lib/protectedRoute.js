'use cleint'
import React, { useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useAuth } from './userContext';
import { useRouter } from 'next/navigation';


function getCookieData() {
    
const { user, login, logout } = useAuth();
    const cookieName = Cookies.get('user')
  
    // Read cookie data from document.cookie, handle potential errors
    try {
      
     
  
      const decodedData = jwt.decode(token) // Decode cookie
  
      // Validate and return decoded cookie data (optional)
      if (decodedData) {
        login(decodedData);
      } else {
        return null; // Invalid cookie data
      }
    } catch (error) {
      console.error('Error getting cookie data:', error);
      return null;
    }
  }
  
  // Function to check cookie expiration (replace with your logic)
  function isCookieExpired(cookieData) {
    const expirationDate = new Date(cookieData.expiration); // Replace with expiration logic
    return Date.now() > expirationDate.getTime();
  }
 
const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [cookieData, setCookieData] = useState(null);

  useEffect(() => {
    // Fetch cookie data on component mount
    const storedCookie = getCookieData();
    setCookieData(storedCookie);
  }, []);

  // Function to redirect if cookie is expired or missing
  const handleRedirect = () => {
    router.push('/'); // Replace with your desired redirect path
  };

  return (
    <>
      {cookieData && !isCookieExpired(cookieData) ? (
        children // Render child components if cookie is valid
      ) : (
        handleRedirect() // Redirect if cookie is expired or missing
      )}
    </>
  );
};

export default ProtectedRoute;