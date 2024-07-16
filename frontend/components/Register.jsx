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
import { useRouter } from "next/navigation";
import LoginBanner from '../public/Image.jpeg'
import Image from 'next/image';

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    

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
              title: 'Account Created',
              text: 'You can now login to your account.',
              showConfirmButton: true,
              confirmButtonColor: '#202123',
              
              // timer: 1500
            })
            .then(() => {
              router.push('/');
            })
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
    <div className="flex items-center justify-center gap-10 mt-20">
    <div className='relative border rounded-md shadow-md'>
    <div className="flex items-center justify-center font-semibold text-2xl mt-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<h1>DOSE GUARDIAN</h1>
</div>
    <Image src={LoginBanner} alt='Login' className='h-[70vh]  w-[500px] object-left rounded-2xl object-cover'/>
    </div>
      <Card className="md:w-[400px] border-none">
        <CardHeader>
        <CardTitle>Register</CardTitle>
          <CardDescription>
            Create an account to access your dashboard and manage medications.
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
                <Label htmlFor="password">Password</Label>
                <input className="InputClass" {...register('password', { required: 'Password is required' })} type="password" id="password" placeholder="password" />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-5 md:flex-row justify-between">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : 'Register'}
              </Button>
              <Link href="/">
                <Button variant="outline">Already have an account? Login</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


export default Register