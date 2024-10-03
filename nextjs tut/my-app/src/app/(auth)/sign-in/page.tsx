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
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"








const Page = () => {
  const styles = {
    container: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: '20px',
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(135deg, #8e44ad, #3498db, #16a085)',
      backgroundSize: 'cover',
      fontFamily: "'Poppins', sans-serif",
      color: '#fff',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 30px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderBottom: '2px solid #e74c3c',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '1.2rem',
      marginRight: '20px',
      transition: 'color 0.3s ease',
    },
    navLinkHover: {
      color: '#f39c12',
    },
    header: {
      textAlign: 'center',
      padding: '100px 0',
    },
    headerText: {
      fontSize: '3rem',
      letterSpacing: '4px',
      color: '#ecf0f1',
    },
    signInContainer: {
      backgroundColor: 'rgba(500, 500, 500, 0.3)',
      backdropFilter: 'blur(10px)',
      padding: '30px',
      borderRadius: '10px',
      width: '400px',
      margin: '80px auto',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '10px 0',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#f4f4f4',
    },
    button: {
      display: 'inline-block',
      width: '100%',
      padding: '12px',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      marginTop: '20px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#c0392b',
      transform: 'scale(1.05)',
    },
   
  };


  const { toast } = useToast()
  const router = useRouter();

  // ZOD implemantatons

 

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password:''
    }
  })



const onSubmit = async (data: z.infer<typeof signInSchema>)=>{
 const result =  await signIn('credentials',{
    redirect: false,
    identifier: data.identifier,
    password: data.password
  })
  if(result?.error) {
    if(result.error == 'CredentiaLlsSignin'){
    toast({
      title: 'Login failed',
      description:"incorrect username or password",
      variant: "destructive"
    })
  }
  else{
    toast({
      title: 'Error',
      description:result.error,
      variant: "destructive"
    })
  }
  } 
 
if(result?.url) {
  router.replace('/dashboard')
}

}

  function setHoverButton(arg0: boolean): void {
    throw new Error("Function not implemented.")
  }

  return (
    <>
    
     

      {/* Header Section
      <header style={styles.header}>
        <h1 style={styles.headerText}>Mystery Sign-In</h1>
      </header>

      {/* Sign-In Form Section */}
      {/* <div style={styles.signInContainer}>
        <h2>Sign In</h2>
        <form>
          <input type="text" placeholder="Username" style={styles.input} />
          <input type="password" placeholder="Password" style={styles.input} />
          <button
            type="submit"
            style={setHoverButton ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
          >
            Sign In
          </button>
        </form>
      </div> */} 

    

    <div style={styles.container}>
    <div className="flex justify-center ">
    
      <div  style={styles.signInContainer}> 
    <div className="text-center">
    <h1 style={styles.headerText} >Join Mystery Message 
    </h1>
    <p className="mb-4"> Sign in to start your anonymous adventure</p>
    </div>
    <Form {...form}>
      <form onSubmit = {form.handleSubmit(onSubmit)} className="space-y-6">
      
       
           <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email/Username</FormLabel>
              <FormControl>
                <Input placeholder="email/username" 
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
        <Button type="submit">
         Sign-In
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
    </div>
    </>
  )
}

export default Page;