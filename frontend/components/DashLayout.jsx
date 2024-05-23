'use client'
import React from 'react'
import Sidebar from './Sidebar'
import { useAuth } from '@/lib/userContext';
import Login from './Login';
import { useRouter } from 'next/navigation';

function DashLayout({children}) {
  const { user, loading } = useAuth();
  const router = useRouter()
  if(!user && !loading){
    router.push("/")
  }
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