import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function PrescriptionLoading() {
  return (
    <div className='grid grid-cols-3  gap-5 mx-10 mt-10'>
        <Card className="w-[300px]">
            <Skeleton className={`w-[300px] h-[300px]`}/>
        </Card>
        <Card className="w-[300px]">
            <Skeleton className={`w-[300px] h-[300px]`}/>
        </Card>
        <Card className="w-[300px]">
            <Skeleton className={`w-[300px] h-[300px]`}/>
        </Card>
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

export default PrescriptionLoading