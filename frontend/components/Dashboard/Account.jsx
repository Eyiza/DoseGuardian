'use client'
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useAuth } from "@/lib/userContext"
function Account() {
    const { user } = useAuth();
  return (
    <div>
      {user && (
           <Card className='h-[100vh] pt-10'>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="timmy Asha" />
            </div> */}
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
          </CardFooter>
        </Card>
      )}
        
    </div>
  )
}

export default Account