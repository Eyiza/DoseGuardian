'use client'
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


const Passwordtype =  {
  type: 'password',
}
const Emailtype= {
    type: 'email',
}

function Login() {
  return (
    <div className="flex items-center justify-center mt-20">
        <Card className=" md:w-[500px]">
        <CardHeader>
        <CardTitle>LOGIN</CardTitle>
        <CardDescription>Welcome to Dose Guardian, your trusted companion in health management. Our mission is to empower you to take control of your health journey with confidence and ease. As you embark on this journey, your safety and privacy are our utmost priority.</CardDescription>
        </CardHeader>
        <CardContent>
        <form className="flex flex-col items-center justify-center gap-5">
            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Email">Email</Label>
                <Input   id="Email" {...Emailtype} placeholder="Joe@gmail.com" />
            </div>
            </div>

            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Password">Password</Label>
                <Input id="password" {...Passwordtype} placeholder="Password" />
            </div>
            </div>
        </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-5 md:flex-row justify-between">
        <Button>Log In</Button>
        <Link href={'/Register'}>
            <Button variant="outline" >Don't have an account? Register</Button>
        </Link>
        
        </CardFooter>
    </Card>
    </div>
    
  )
}

export default Login