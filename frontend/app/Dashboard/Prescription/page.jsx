import DashLayout from '@/components/DashLayout'
import PrescriptionPage from '@/components/Dashboard/Prescription/PrescriptionPage'
import React from 'react'

function page() {
  return (
    <DashLayout>
        <PrescriptionPage/>
    </DashLayout>
  )
}

export default page