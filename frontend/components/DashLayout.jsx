'use client'
import React from 'react'
import Sidebar from './Sidebar'
import { useAuth } from '@/lib/userContext';
import Login from './Login';

function DashLayout({children}) {
  const { user } = useAuth();
  return (
    <>
    {user && (
      <div className='flex'>
      <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[15rem]'>
          <Sidebar/>
      </div>
      <div className='flex-1'>
          {children}
      </div>

  </div>
    )}
    </>
    
  )
}

export default DashLayout