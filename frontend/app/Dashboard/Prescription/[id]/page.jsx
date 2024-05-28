import DashLayout from '@/components/DashLayout'
import PrescriptionID from '@/components/Dashboard/Prescription/PrescriptionID'
import React from 'react'

function page({ params }) {
  return (
    <DashLayout>
      <PrescriptionID id={params.id}/>
    </DashLayout>
  )
}

export default page