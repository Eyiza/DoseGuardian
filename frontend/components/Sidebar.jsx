'use client'
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'
import { Button } from './ui/button'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Sidebar() {

    const router = useRouter()
    const handleLogout = async () => {
        try {
            const response = await fetch('https://doseguardianapi.onrender.com/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Logout failed with status ${response.status}`);
              }
            const data = await response.json()
            if(data.success){
                Cookies.remove('user')
                router.push('/')
            }
        } catch (error) {
            console.error('Logout error:', error);
            
        } 
    }
  return (
    <div className='p-2 pt-10 flex flex-col h-screen text-white'>
        <h1 className='text-2xl cursor-pointer font-bold text-center'>DoseGuardian</h1>

        <div className='flex flex-col items-center h-screen'>
            <div className='flex-1'>
            <ul className='flex flex-col items-center justify-center gap-5 mt-10'>
                <Link href={`/Dashboard`}>
                <li className='text-base font-semibold cursor-pointer hover:underline'>Home</li>
                </Link>

            <li className='text-base font-semibold cursor-pointer hover:underline'>Prescription</li>
            <Link href={`/Dashboard/Account`}><li className='text-base font-semibold cursor-pointer hover:underline'>Account</li></Link>
            </ul>
        </div>
        
        <div className=''>
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Log out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Please don&apos;t log out stay and enjoy our service 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay Back</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={handleLogout} type="button">Log out</Button>
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        </div>
        </div>
        
    </div>
  )
}

export default Sidebar