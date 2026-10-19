
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { Loader2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { toast } from "sonner"
import { apiBaseUrl, saveAuth } from "@/lib/auth"

const Login = () => {
 const [showPass, setshowPass] = useState(false);
   const [loading, setloading] = useState(false);
 
   const [formData, setformData] = useState({
     email: "",
     password: "",
 
   });
 
   const navigate = useNavigate()
 
   const handleChanged = (e) => {
     const { name, value } = e.target;
     setformData((prev) => ({
       ...prev,
       [name]: value
     }))
   }
 
   const submitHandler = async (e) => {
     e.preventDefault();
     console.log(formData);
     try {
       setloading(true);
      const res = await axios.post(`${apiBaseUrl}/api/user/login`, formData, {
         headers: {
           "Content-Type": "application/json"
         }
       })
       if (res.data.success) {
         saveAuth(res.data)
         navigate('/')
         toast.success(res.data.message)
       }
 
     } catch (error) {
       toast.error(error.response.data.message)
     } finally {
       setloading(false);
     }
 
   }
 
 
   return (
     <div className="w-screen h-screen flex justify-center items-center">
       <Card className="w-full max-w-md rounded-lg ">
         <CardHeader className="flex flex-col items-center">
           <CardTitle className="text-2xl font-serif" >Login your account</CardTitle>
           <CardDescription>
             Enter details to Login your account
           </CardDescription>
         </CardHeader>
 
         <form onSubmit={submitHandler}>
           <CardContent>
             <div className="flex flex-col gap-6">
               <div className="grid gap-2">
                 <Label htmlFor="email">Email</Label>
                 <Input
                   id="email"
                   type="email"
                   name="email"
                   placeholder="m@example.com"
                   className=" mt-1 px-2 border-2 border-gray-300 rounded-md "
                   required
                   value={formData.email}
                   onChange={handleChanged}
                 />
               </div>
               <div className="grid gap-2">
                 <div className="flex items-center">
                   <Label htmlFor="password">Password</Label>
                 </div>
 
                 <div className="relative">
                   <Input
                     id="password"
                     name="password"
                     placeholder=" Create Password"
                     className=" mt-1 px-2 border-2 border-gray-300 rounded-md "
                     type={showPass ? "text" : "password"}
                     required
                     value={formData.password}
                     onChange={handleChanged}
                   />
                   {
                     showPass ? <EyeOff onClick={() => { setshowPass(false) }} className="w-5 h-5 text-gray-500 absolute right-2 bottom-2 cursor-pointer" /> :
                       <Eye onClick={() => { setshowPass(true) }} className="w-5 h-5 text-gray-500 absolute right-2 bottom-2 cursor-pointer" />
                   }
                 </div>
               </div>
             </div>
           </CardContent>
           <CardFooter className="mt-2 flex-col gap-2">
             <Button type="submit" className="w-full hover:bg-gray-800 rounded-lg cursor-pointer">
               {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Please wait</> : 'Login'}
             </Button>
             <p className="text-sm text-gray-500">Already have an account ? <Link to={"/signUp"} className="text-pink-800 cursor-pointer hover:underline" >Signup</Link> </p>
           </CardFooter>
         </form>
       </Card>
     </div>
   )
}

export default Login
