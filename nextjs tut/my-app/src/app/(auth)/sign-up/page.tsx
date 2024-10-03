'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import {useDebounceCallback, useDebounceValue} from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signupSchema } from "@/schemas/signUpSchema"
import axios ,{AxiosError} from 'axios'
import { ApiResponse } from "@/types/apiResponse"
import { userAgent } from "next/server"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"








const Page = () => {
  const [username,setUsername] = useState('')
  const [usernameMessage,setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)

  const debounced = useDebounceCallback(setUsername,300) 

  const { toast } = useToast()
  const router = useRouter();


  const [hover, setHover] = useState(false);

  const buttonStyle = {
    backgroundColor: hover ? '#ff6f61' : '#007bff', // Change background color on hover
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const containerStyle = {
    backgroundColor: '#f3f4f6', // Fabulous background color
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const headingStyle = {
    fontSize: '3rem',
    color: '#1a202c', // Dark theme color for mystery
    marginBottom: '1rem',
  };

  const contentStyle = {
    fontSize: '1.25rem',
    color: 'red',
    textAlign: 'center',
  };

  // ZOD implemantatons

 

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password:''
    }
  })

useEffect(()=>{
const checkUsernameUnique = async () =>{
  if(username) {
    setIsCheckingUsername(true)
    setUsernameMessage('')

    try {
   const response =  await axios.get(`/api/check-username-unique?username=${username}`)
   console.log(response.data.message)
   let message = (response.data.message)
   setUsernameMessage(message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setUsernameMessage(
        axiosError.response?.data.message ?? 'Error checking username'
      )
    } finally {
      setIsCheckingUsername(false)
    }
  }
}
checkUsernameUnique()
}, [username])

const onSubmit = async (data: z.infer<typeof signupSchema>)=>{
  setIsSubmitting(true)
  try {
    const response = await axios.post<ApiResponse>('/api/sign-up',data)
    toast({
      title: 'Success',
      description: response.data.message
    })
    router.replace(`/verify/${username}`)
    setIsSubmitting(false)
  } catch (error) {
    console.error(' Error in signup of user',error)
    const axiosError = error as AxiosError<ApiResponse>;
    let errorMessage = axiosError.response?.data.message
    toast({
      title: "Signup failed",
      description: 'errorMessage',
      variant: "destructive"
    })
    setIsSubmitting(false)
  }
}

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md"> 
    <div className="text-center">
    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 ">Join Mystery Message 
    </h1>
    <p  className="mb-4"> Sign up to start your anonymous adventure</p>
    </div>
    <Form {...form}>
      <form onSubmit = {form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
      name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" 
                {...field} 
                onChange={(e)=>{
                  field.onChange(e)
                  debounced(e.target.value)
                }}
                />
              </FormControl>
              {isCheckingUsername && <Loader2 className="animate-spin"/>}
              <p className={`text-sm ${usernameMessage ==="Username is unique" ? 'text-green-500' : 'text-red-500'}`}>
                test {usernameMessage}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />    
           <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" 
                {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" 
                {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <Button type="submit" disabled = {isSubmitting} style={buttonStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
          {
            isSubmitting ? (
            <>
            <Loader2  className="mr-2 h-4 w-4 animate-spin"/> Please wait
            </>
            ) : ('signup')
          }

        </Button>
        
      </form>
    </Form>
    <div className="text-center mt-4">
      <p>
        Already a member?{' '}
        <Link href="/sign-in" className="text-blue-600 hover:text-blue-800"> Sign-in
        </Link>
      </p>

    </div>
      </div>  
    </div>
  )
}

export default Page;