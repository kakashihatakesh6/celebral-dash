'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Separator } from '@/app/components/ui/separator';
import { Input } from '@/app/components/ui/input';
import { useRouter } from 'next/navigation';
import { Github, Loader2, Slack } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('trial');
  const [password, setPassword] = useState('assignment123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://3.111.196.92:8020/api/v1/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email: "testnikhil@gmai.com", phone_number: "6268885174", input_code: "1234" }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      if (data) {
        localStorage.setItem('token', data.message);
        setIsLoading(false);
        router.push('/dashboard');
      } else {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      // Redirect to dashboard or handle successful login
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div> */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder="nikhil123" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" onChange={(e) => { setPassword(e.target.value) }} type="password" required />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              {/* <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.0003 2C6.4773 2 2.00024 6.477 2.00024 12C2.00024 17.523 6.4773 22 12.0003 22C17.5233 22 22.0002 17.523 22.0002 12C22.0002 6.477 17.5233 2 12.0003 2ZM14.5953 16.606L12.0003 14.01L9.4053 16.606L7.9943 15.195L10.5893 12.6L7.9943 10.005L9.4053 8.594L12.0003 11.189L14.5953 8.594L16.0063 10.005L13.4113 12.6L16.0063 15.195L14.5953 16.606Z" />
            </svg> */}
              <Slack className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        {/* <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">Don&apos;t have an account?</span>
            <a href="#" className="text-primary underline-offset-4 transition-colors hover:underline">
              Sign up
            </a>
          </div>
          <a href="#" className="text-sm text-primary underline-offset-4 transition-colors hover:underline">
            Forgot password?
          </a>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default Login;