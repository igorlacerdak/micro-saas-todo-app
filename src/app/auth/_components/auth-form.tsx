'use client';

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

export function AuthForm() {
  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn('nodemailer', { email: data.email, redirect: false });

      toast.success('Magic Link Sent', {
        description: 'Check your email for the magic link to login',
        duration: 10000,
      });
    } catch (error) {
      toast.error('Failed sent email', {
        description: 'Internal server error',
        duration: 10000,
      });
    }
  });

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...form.register('email')}
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Sending...' : 'Send magic link'}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center">
            <Link className="underline" href="#">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
