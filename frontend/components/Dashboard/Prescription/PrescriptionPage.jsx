
import { Card, CardHeader, CardTitle } from '../../ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Button } from '../../ui/button'
import Prescription from './Prescription'
import PrescriptionDetails from './PrescriptionDetails'
import { ScrollArea } from '../../ui/scroll-area'

function PrescriptionPage() {
   
  return (
    <div>
        <Card className="h-[100vh] pt-10 " >
            <div className='flex items-center px-5 justify-between border-b-2'>
            <CardHeader>
        <CardTitle>Prescriptions</CardTitle>
      </CardHeader>
      <div> 
      <Dialog>
      <DialogTrigger asChild>
      <Button>Create new prescription</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[500px]">
        <DialogHeader>
          <DialogTitle>Create Prescription</DialogTitle>
          <DialogDescription>
           <Prescription/>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
      </div>
            </div>
            <ScrollArea className="h-[500px]">
            <PrescriptionDetails/>
            </ScrollArea>
            
        </Card>
       
    </div>
  )
}

export default PrescriptionPage