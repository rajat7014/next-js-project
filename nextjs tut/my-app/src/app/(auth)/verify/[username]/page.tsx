'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/apiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { use } from 'react'
import {  useForm } from 'react-hook-form'
import * as z   from 'zod'

const VerifyAccount = () => {
    const router = useRouter()
    const param = useParams<{username: string}>()
    const {toast} = useToast()

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        
      })

const onSubmit = async (data: z.infer<typeof verifySchema>) =>{
    try {
        const response = await axios.post(`/api/verify-code`,{
            code: data.code
        })

        toast({
            title:"Success",
            description: response.data.message
        })
        router.replace('sign-in')

    } catch (error) {
        console.error(' Error in signup of user',error)
    const axiosError = error as AxiosError<ApiResponse>;
    toast({
      title: "Signup failed",
      description: axiosError.response?.data.message,
      variant: "destructive"
    })

    }
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
    <div className="text-center">
    <h1 className="text-4*l font-extrabold tracking-tight lg:text-5*l mb-6">verify your account
    </h1>
    <p className="mb-4"> Enter the verification code sent to your email</p>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
    </div>
  )
}

export default VerifyAccount