import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

function Register() {
    const Passwordtype =  {
        type: 'password',
      }
      const Emailtype= {
          type: 'email',
      }
      const UserNametype = {
        type: 'text'
      }
  return (
    <div className="flex items-center justify-center mt-20">
    <Card className=" md:w-[500px]">
    <CardHeader>
    <CardTitle>Register</CardTitle>
    <CardDescription>
        Embark on your health journey with Dose Guardian by 
        creating your personalized account. Our registration process
         is designed with simplicity and security in mind, ensuring
          a seamless onboarding experience for every new member.</CardDescription>
    </CardHeader>
    <CardContent>
    <form className="flex flex-col items-center justify-center gap-5">
    <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Username</Label>
            <Input id="username" {...UserNametype} placeholder="john" />
        </div>
        </div>
        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Email</Label>
            <Input id="email" {...Emailtype} placeholder="john@gmail.com" />
        </div>
        </div>

        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Password</Label>
            <Input id="password" {...Passwordtype} placeholder="Password" />
        </div>
        </div>
    </form>
    </CardContent>
    <CardFooter className="flex flex-col gap-5 md:flex-row justify-between">
    <Button>Register</Button>
    <Link href={'/'}>
        <Button variant="outline" >Already have an account? Login</Button>
    </Link>
    
    </CardFooter>
</Card>
</div>
  )
}

export default Register