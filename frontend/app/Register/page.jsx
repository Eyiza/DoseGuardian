import React from 'react'
import dynamic from 'next/dynamic'
 
const Register = dynamic(() => import('../../components/Register'), { ssr: false })

function page() {
  return (
    <Register/>
  )
}

export default page