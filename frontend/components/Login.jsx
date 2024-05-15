'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/userContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import { RotatingLines } from 'react-loader-spinner';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, login, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://doseguardianapi.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // if (!response.ok) {
      //   throw new Error(`Login failed with status ${response.status}`);
      // }

      const data = await response.json();
      if (data.success) {
        const token = data.token;
        Cookies.set('user', token, { expires: 1 });
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          showConfirmButton: false,
          timer: 1500
        });
        router.push('/Dashboard');
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Login Failed',
          text: data.message,
        });
      }
    } catch (error) {
      if (error.c)
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="md:w-[500px]">
        <CardHeader>
          <CardTitle>DOSE GUARDIAN</CardTitle>
          <CardDescription>
            Welcome back! Log in to your account to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
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
                {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : 'Log In'}
              </Button>
              <Link href="/Register">
                <Button variant="outline">Don&apos;t have an account? Register</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
