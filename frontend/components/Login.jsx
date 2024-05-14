'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useAuth } from "@/lib/userContext"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, login, logout } = useAuth();
  const router = useRouter()
  const onSubmit = async ({email, password}) => {
    try {
      const response = await fetch('https://doseguardianapi.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }

      // Handle successful login (e.g., redirect, store user data)
      const data = await response.json()
      if (data.success){
        // const decodedToken = jwt.decode(data.token)
        // login(decodedToken)
        const token = data.token
        Cookies.set('user', token, { expires: 1 })
        router.push('/Dashboard')
       
        
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login errors (e.g., display error message)
    }
  };
  return (
    <div className="flex items-center justify-center mt-20">
        <Card className=" md:w-[500px]">
        <CardHeader>
        <CardTitle>LOGIN</CardTitle>
        <CardDescription>Welcome to Dose Guardian, your trusted companion in health management. Our mission is to empower you to take control of your health journey with confidence and ease. As you embark on this journey, your safety and privacy are our utmost priority.</CardDescription>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5">
            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Email">Email</Label>
                <input className="InputClass " {...register('email', { required: 'Email is required' })} type="email" name="email" id="email" placeholder="john@gmail.com" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            </div>

            <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="Password">Password</Label>
                <input className="InputClass"  {...register('password', { required: 'Password is required' })} type="password" name="password" id="password" placeholder="password"/>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            </div>
            <div className="flex flex-col gap-5 md:flex-row justify-between">
        <Button type="submit">Log In</Button>
        <Link href={'/Register'}>
            <Button variant="outline" >Don&apos;t have an account? Register</Button>
        </Link>
        </div>
        </form>
        </CardContent>
    </Card>
    </div>
    
  )
}

export default Login