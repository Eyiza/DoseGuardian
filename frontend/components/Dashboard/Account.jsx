'use client'
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../ui/alert-dialog"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { useAuth } from "@/lib/userContext"


function Account() {
    const { user } = useAuth();
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const response = await fetch('https://doseguardianapi.onrender.com/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error(`Logout failed with status ${response.status}`);
              }
            const data = await response.json()
            if(data.success){
                Cookies.remove('user')
                router.push('/')
            }
        } catch (error) {
            console.error('Logout error:', error);
            
        }
        
    }
  return (
    <div>
         <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="timmy Asha" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue={user?.user.username} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input id="email" defaultValue={user?.user.email} />
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button>Save changes</Button>
            <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Log out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Please don&apos;t log out stay and enjoy our service 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay Back</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={handleLogout} type="button">Log out</Button>
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
          </CardFooter>
        </Card>
    </div>
  )
}

export default Account