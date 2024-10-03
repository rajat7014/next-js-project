'use client';

import { Message, User } from "@/model/user"
import MessageCard from "@/components/MessageCard"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/apiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@radix-ui/react-separator"
import axios, { AxiosError } from "axios"
import { Loader2, RefreshCcw } from "lucide-react"
import { useSession } from "next-auth/react"
import { use, useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/compat/router";
// import { toast } from 'react-toastify';




const Page = () => {
  const router = useRouter();
  
  const [messages , setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

const {toast} = useToast()
const handleDeleteMessage = (messageId: string) =>{
  setMessages(messages.filter((message)=> message._id !==messageId))
}

const {data:session,status} = useSession()
const form = useForm({
  resolver: zodResolver(acceptMessageSchema)
})

const {register,watch,setValue} = form;
const acceptMessages = watch('acceptMessages')

const fetchAcceptMessage = useCallback(async()=>{
  setIsSwitchLoading(true)
try {
  const response = await axios.get<ApiResponse>('/api/accept-messages')
  setValue('acceptMessages',response.data.isAcceptingMessage)
} catch (error) {
  const axiosError = error as AxiosError<ApiResponse>
  toast({
    title: "Error",
    description: axiosError.response?.data.message || "Failed to fetch message settings",
    variant: "destructive"
  })
} finally{
  setIsSwitchLoading(false)
}

},[])

const fetchMessages = useCallback(async (refresh: boolean = false) =>{
  setIsLoading(true)
  setIsSwitchLoading(false)
try {
  
const response = await axios.get<ApiResponse>('/api/get-messages')
setMessages(response.data.messages || [])
if(refresh){
  toast({
    title: "Refreshed Messages",
    description: "Showing latest messages"
  })
}

} catch (error) {
  const axiosError = error as AxiosError<ApiResponse>
  toast({
    title: "Error",
    description: axiosError.response?.data.message || "Failed to fetch message settings",
    variant: "destructive"
  })
}
finally{
  setIsLoading(false)
  setIsSwitchLoading(false)
}
},[setIsLoading,setMessages])

useEffect(()=>{
  if (!session || !session.user) return
  fetchMessages()
  fetchAcceptMessage() 

},[session,setValue,fetchAcceptMessage,fetchMessages])

// handle switch change
const handleSwitchChange = async() =>{
  try {
   const response =  await axios.post<ApiResponse>('/api/accept-messages',{
      acceptMessages: !acceptMessages
    })
    setValue('acceptMessages',!acceptMessages)
    toast({
      title: response.data.message,
      variant: 'default'
    })

  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>
  toast({
    title: "Error",
    description: axiosError.response?.data.message || "Failed to fetch message settings",
    variant: "destructive"
  })
  }
}

// const {username} = session?.user ?? {}
// TODO do more research

// useEffect(()=>{
//   const baseUrl = `${window.location.protocol}//${window.location.host}`
//   },[])
// const profileUrl = `${baseUrl}/u/${username}`

// const copyToClipboard = ()=>{
//   navigator.clipboard.writeText(profileUrl)
//   toast({
//     title: 'URL copied',
//     description: 'Profile URL has been copied to clipboard'
//   })
// }

// if(!session || !session.user){
//   return <div>Please login</div>
// }



useEffect(() => {
  if (typeof window !== 'undefined') {
    const baseUrlFromWindow = `${window.location.protocol}//${window.location.host}`;
    setBaseUrl(baseUrlFromWindow);
  }
}, []);

// If no session, redirect to the sign-in page
useEffect(() => {
  if (router?.push) {
    router.push('/sign-in');
  }
}, [status, router]);

if (status === 'loading') {
  return <p>Loading...</p>;
}

if (!session) {
  return <p>Please log in to access the dashboard.</p>;
}

const username = session.user?.name || 'User';
const profileUrl = baseUrl ? `${baseUrl}/u/${username}` : '#';

const copyToClipboard = () => {
  if (baseUrl && navigator.clipboard) {
    navigator.clipboard.writeText(profileUrl);
    alert('Profile URL copied to clipboard!');
  }



  return (
    <div className="my-8 mx-4:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6*l">
      <h1 className="text-4*l font-bold mb-4">User Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy your unique link</h2> {''}
        <div className="flex-items-center">
          <input type="text" value={profileUrl} disabled className="input input-bordered w-full p-2 mr-2">
          </input>
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch {...register('acceptMessages')} checked={acceptMessages}
        onCheckedChange={handleSwitchChange} disabled={isSwitchLoading}
        />
        <span className="ml-2">Accept Messages : {acceptMessages ? 'On' : 'Off'}</span>
      </div>
      <Separator></Separator>

      <Button className="mt-4"
      variant="outline"
      onClick={(e)=>{
        e.preventDefault();
        fetchMessages(true)
      }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4"/>
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message,index)=>(
            <MessageCard  key={message._id as string} message={message} onMessageDelete={handleDeleteMessage} />
          ))
        ) : (
          <p>No messages to display</p>
        )}
      </div>
    </div>
  )
}
}
export default Page
