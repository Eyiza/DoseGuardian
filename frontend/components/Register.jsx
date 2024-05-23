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
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2';
import { RotatingLines } from 'react-loader-spinner';
import { useState } from "react"

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async ({ email, password, username }) => {
        setIsLoading(true);
        try {
          const response = await fetch('https://doseguardianapi.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          });

          const data = await response.json();
          if (data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Account Successful',
              text: 'Log in',
              showConfirmButton: false,
              timer: 1500
            });
            router.push('/');
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Account Creation Failed',
              text: data.message,
            });
          }
        } catch (error) {
          if (error.c)
          console.error('Account Creation error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Account Creation Error',
            text: 'Something went wrong. Please try again.',
          });
        } finally {
          setIsLoading(false);
        }
      };
    
  return (
    <div className="flex items-center justify-center mt-20">
    <Card className=" md:w-[500px]">
    <CardHeader>
    <CardTitle>Register</CardTitle>
    <CardDescription>
        Create an account to access your dashboard and manage your medications.
    </CardDescription>
    </CardHeader>
    <CardContent>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5">
    <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Username</Label>
            <input id="username" {...register('username', { required: 'Username  is required' })} className="InputClass" type="text"  placeholder="john" />
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        </div>
        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Email</Label>
            <input className="InputClass" {...register('email', { required: 'Email is required' })} type="email" id="email" placeholder="john@gmail.com" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        </div>

        <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Password</Label>
            <input className="InputClass" {...register('password', { required: 'Password is required' })} type="password" id="password" placeholder="password" />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        </div>
        <div className="flex flex-col gap-5 md:flex-row justify-between">
    <Button type="submit" disabled={isLoading}>
                {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : 'Register'}
              </Button>
    <Link href={'/'}>
        <Button variant="outline" >Already have an account? Login</Button>
    </Link>
    
    </div>
    </form>
    </CardContent>
    
</Card>
</div>
  )
}

export default Register