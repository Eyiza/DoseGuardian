'use client'
import { useAuth } from '@/lib/userContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from './ui/button';
import Account from './Dashboard/Account';
import Prescription from './Dashboard/Prescription';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


function Dashboard() {
    const { user } = useAuth();
    const router = useRouter()
  return (
    <div className=''>

            {/* <Tabs defaultValue="home" className="w-[400px]">
      <TabsList className="grid w-full gap-10 grid-cols-3 px-10">
      <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger className="px-14" value="prescription">Prescription</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Account/>
      </TabsContent>
      <TabsContent value="prescription">
        <Prescription/>
      </TabsContent>
      <TabsContent value="home">
        <Card >
          <CardHeader>
            <CardTitle>Welcome, {user?.user.username}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
          Hi there! DoseGuardian is here to be your medication sidekick. We&apos;ll help you stay on top of your meds and make managing your health a breeze. Welcome aboard!
          </CardContent>
          <CardFooter>
            <Button>Create a new prescription</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs> */}

    {user &&(
      <Card className="h-[100vh] pt-10" >
      <CardHeader>
        <CardTitle>Welcome, {user?.user.username}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
      Welcome to DoseGuardian, your dedicated partner in medication management! <br/>
      This platform is designed to make managing medications simple, efficient, and stress-free. Whether it's tracking prescriptions, setting up reminders, or getting detailed information about medications, we've got you covered. <br/>
      Health is our priority, and we're committed to achieving the best possible outcomes. Welcome aboard!
      </CardContent>
      <CardFooter>
        <Dialog>
      <DialogTrigger asChild>
      <Button>Create a new prescription</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[450px]">
        <DialogHeader>
          <DialogTitle>Create a Prescription</DialogTitle>
          <DialogDescription>
           <Prescription/>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
      </CardFooter>
    </Card>
    )}
    
    </div>
  )
}

export default Dashboard