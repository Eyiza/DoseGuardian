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

function Dashboard() {
    const { user } = useAuth();
    console.log(user)
  return (
    <div className='flex items-center justify-center mt-20'>
            <Tabs defaultValue="home" className="w-[400px]">
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
    </Tabs>
    </div>
  )
}

export default Dashboard