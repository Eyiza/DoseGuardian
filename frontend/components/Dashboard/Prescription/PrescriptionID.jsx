'use client'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import PrescriptionIDLoading from './PrescriptionIDLoading'
import { useAuth } from '@/lib/userContext'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

function PrescriptionID({id}) {
  const { seturID } = useAuth();
  seturID(id)
  const [prescriptioID, setprescriptionID] = useState()
  const [loading, setloading] = useState(true)

  useEffect(()=> {
    fetchID(id)
  }, [id])
  const fetchID = async (id) => {
    const token = Cookies.get('user')
    try {
      const response = await fetch(`https://doseguardianapi.onrender.com/prescription/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      })
      const data = await response.json()
      if(data.success){
        console.log(data)
        setprescriptionID(data.prescription)
        setloading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeactivate  = async () => {
    const token = Cookies.get('user')
    try {
      const response = await fetch(`https://doseguardianapi.onrender.com/deactivate/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      })
      const data = await response.json()
      if(data.success){
        fetchID(id)
      }
    } catch (error) {
      console.log(error)
    }
    

  }
  return (
    <div>
     {loading?(<PrescriptionIDLoading/>): (
       <Card className="h-[100vh] pt-10 " >
       <div className='flex items-center px-5 justify-between border-b-2'>
       <CardHeader className="">
     <CardTitle >
       <Link className='hover:underline' href={`/Dashboard/Prescription`}>Back</Link> | <span>{prescriptioID?.dispenserSerialNumber
}</span>
     </CardTitle>
   </CardHeader>
   <Button>Edit prescription</Button>
   </div>

   <div className='flex items-start justify-start gap-5 mx-5 mt-10'>
     <div className='flex-1'>
       <p className='font-bold text-2xl mb-5'>Medication</p>
       <Card>
         <Table>
         <TableHeader>
           <TableRow>
             <TableHead >Name </TableHead>
             <TableHead>Dosage</TableHead>
             <TableHead>Interval</TableHead>
           </TableRow>
         </TableHeader>
         <TableBody>

           {prescriptioID?.medications.map((med, index) => (
             <TableRow key={index}>
             <TableCell>{med.name}</TableCell>
             <TableCell>{med.dosage}</TableCell>
             <TableCell>{med.interval}</TableCell>
           </TableRow>
           ))}
           
         </TableBody>
       </Table>
       </Card>
     
     </div>

     <div>
       <Card className={' mt-10 ml-10'}>
         <CardHeader>
           <CardTitle className="text-base whitespace-nowrap">Patient&apos;s Information </CardTitle>
         </CardHeader>

         <CardDescription className="mx-5 mb-5 flex flex-col gap-2 ">
           <span className='line-clamp-2'>Email: {prescriptioID?.contact.email}</span>
           <span>Phone Number: {prescriptioID?.contact.phoneNumber}</span>
           <span>Duration : {prescriptioID?.duration} days</span>
           <span>Status: {prescriptioID?.active?(<Badge>Active</Badge>):(<Badge variant="secondary">Not Active</Badge>)} </span>
         </CardDescription>

         <CardFooter>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {prescriptioID?.active?(<Button variant="destructive">Deactivate</Button>): ('')}

          {/* <Button variant="destructive">Deactivate</Button> */}
          
          
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure you want to Deactivative ?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Sorry</AlertDialogCancel>
            <AlertDialogAction>
              <Button onClick={handleDeactivate}  type="button">Yes, Sure</Button>
              </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
         </CardFooter>
       </Card>
     </div>
   </div>
  
   
   </Card>
     )}
    </div>
  )
}

export default PrescriptionID