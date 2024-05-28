'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card'
import { Badge } from '../../ui/badge'
import Cookies from 'js-cookie'

import Link from 'next/link'
import PrescriptionLoading from './PrescriptionLoading'

function PrescriptionDetails() {
    const [Prescription, setPrescription] = useState([])
    const [Loading, setLoading] = useState(true)
    const fetchPrescriptions = async () => {
        const token = Cookies.get('user')
        try {
          const response = await fetch(`https://doseguardianapi.onrender.com/prescriptions`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            next: {
                revalidate: 60 * 60 * 24 // 1 day
              }
          })
          const data = await response.json()
          setPrescription(data.prescriptions)
          setLoading(false)
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(() => {
        fetchPrescriptions()
      }, [])
  return (
    <>
    {Loading?(<PrescriptionLoading/>): (
         <div className='mt-10 mx-10 grid grid-cols-3 gap-5'>
         {Prescription?.map((data) => (
          <Link href={`Prescription/${data._id}`}>
           <Card key={data._id} className="w-[300px] p-4 cursor-pointer">
              <CardHeader >
              <CardTitle className="whitespace-nowrap">S/N: {data.dispenserSerialNumber}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
            <p><span>Medication:</span> {data.medications.length}</p>
            <p><span>Duration:</span> {data.duration} days</p>
            </CardContent>
            <CardFooter>
            <p>Status: {data.active?(<Badge>Active</Badge>):(<Badge variant="secondary">Not Active</Badge>)} </p>
            </CardFooter>
              </Card>
          </Link>
             
         ))} 
     </div>
    )}
   
    </>
  )
}

export default PrescriptionDetails