import React from 'react'
import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

function PrescriptionDashLoading() {
  return (
    <div className='flex   gap-5 mx-5 mt-5'>
    <Card className="w-[300px]">
        <Skeleton className={`w-[300px] h-[300px]`}/>
    </Card>
    <Card className="w-[300px]">
        <Skeleton className={`w-[300px] h-[300px]`}/>
    </Card>
    <Card className="w-[300px]">
        <Skeleton className={`w-[300px] h-[300px]`}/>
    </Card>
</div>
  )
}

export default PrescriptionDashLoading