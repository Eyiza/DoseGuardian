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
import PrescriptionLoading from './Dashboard/PrescriptionLoading'
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
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Badge } from './ui/badge';

function Dashboard() {
    const { user } = useAuth();
    const router = useRouter();

    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPrescriptions = async () => {
      const token = Cookies.get('user');
      try {
        const response = await fetch('https://doseguardianapi.onrender.com/prescriptions', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          next: {
            revalidate: 60 * 60 * 24, // 1 day
          },
        });
        const data = await response.json();
        const activePrescriptions = data.prescriptions.filter(prescription => prescription.active).slice(0, 3);
        setPrescriptions(activePrescriptions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };
  
    useEffect(() => {
      fetchPrescriptions();
    }, []);

  return (
    <div className=''>

    {user &&(
      <Card className="h-[100vh] pt-10" >
      <CardHeader>
        <CardTitle>Welcome, {user?.user.username}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
      Welcome to DoseGuardian, your dedicated partner in medication management! <br/>
      This platform is designed to make managing medications simple, efficient, and stress-free. Whether it&apos;s tracking prescriptions, setting up reminders, or getting detailed information about medications, we&apos;ve got you covered. <br/>
      Health is our priority, and we&apos;re committed to achieving the best possible outcomes. Welcome aboard!
      </CardContent>
      <CardFooter>
        <Dialog>
      <DialogTrigger asChild>
      <Button>Create new prescription</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[450px]">
        <DialogHeader>
          <DialogTitle>Create Prescription</DialogTitle>
          <DialogDescription>
           <Prescription/>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
      </CardFooter>

      <div className="mt-10 mx-10 grid grid-cols-3 gap-5">
            {loading ?(<PrescriptionLoading/>) : (
              prescriptions.map((data) => (
                <Card key={data._id} className="w-[300px] p-4 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="whitespace-nowrap">S/N: {data.dispenserSerialNumber}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><span>Medication:</span> {data.medications.length}</p>
                    <p><span>Duration:</span> {data.duration}</p>
                  </CardContent>
                  <CardFooter>
                    <p>Status: {data.active ? (<Badge>Active</Badge>) : (<Badge variant="secondary">Not Active</Badge>)} </p>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
    </Card>
    )}
    
    </div>
  )
}

export default Dashboard