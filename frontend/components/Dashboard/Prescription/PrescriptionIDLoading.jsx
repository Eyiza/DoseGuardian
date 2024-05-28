import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

function PrescriptionIDLoading() {
  return (
    <div>
      <Card className="h-[100vh]  " >
          <div className='border-b-2'>
            <Skeleton className={'h-20 w-full'}/>
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
                <TableRow>
                    <TableCell><Skeleton className={'w-full h-10'}/></TableCell>
                    <TableCell><Skeleton className={'w-full h-10'}/></TableCell>
                    <TableCell><Skeleton className={'w-full h-10'}/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Skeleton className={'w-full h-10'}/></TableCell>
                    <TableCell><Skeleton className={'w-full h-10'}/></TableCell>
                    <TableCell><Skeleton className={'w-full h-10'}/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Skeleton className={'w-full h-10'}/></TableCell>
                    <TableCell><Skeleton className={'w-full h-10'}/></TableCell>
                    <TableCell><Skeleton className={'w-full h-10'}/></TableCell>
                </TableRow>

           
           
              
            </TableBody>
          </Table>
          </Card>
        
        </div>

        <div>
          <Card className={'w-[250px] mt-10 ml-10'}>
            <Skeleton className={'w-[250px] h-[250px]'}/>
          </Card>
        </div>
      </div>
     
      
      </Card>
    </div>
  )
}

export default PrescriptionIDLoading