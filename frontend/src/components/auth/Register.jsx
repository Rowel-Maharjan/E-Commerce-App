import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/Label"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/auth-slice';
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from 'lucide-react';


const Register = () => {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data) => {
    try {
      //Post Request to save data in database and withCredentials to have cookies set
      const response = await axios.post("http://localhost:3000/api/auth/register", data, {
        withCredentials: true
      });
      dispatch(registerUser())
      if (response.data.success) {
        reset()
        navigate("/auth/login")
        toast({
          description: "Registrantion Successful",
          className: "bg-black text-white",
          duration: 2500
        })
      }
      else {
        toast({
          variant: "destructive",
          description: "Email Already Exist.",
        })
      }

    }
    catch (error) {

      console.log(error)
    }
  }
  return (
    <div className='mx-auto w-full max-w-md text-black'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground mb-6 text-center'>Create New Account</h1>
      <form className='flex flex-col gap-2 text-black' onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Username {errors.username && <span className='text-sm ml-2 text-red-600'> *{errors.username.message}</span>}</Label>
          <input className='border border-input px-3 py-2 text-sm placeholder:text-muted-foreground rounded-md focus:outline-gray-600 bg-[#e8f0fe]' placeholder='Enter your user name' type="text"
            {...register("username",
              {
                required: { value: true, message: "Please Enter Username" },
                minLength: { value: 3, message: "Min Length is 3" }
              })} />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email {errors.email && <span className='text-sm ml-2 text-red-600'> *{errors.email.message}</span>}</Label>
          <input className='w-full border border-input px-3 py-2 text-sm placeholder:text-muted-foreground rounded-md focus:outline-gray-600 bg-[#e8f0fe]' placeholder='Enter your email' type="email"
            {...register("email",
              {
                required: { value: true, message: "Please Enter Email" },

              })} />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password {errors.password && <span className='text-sm ml-2 text-red-600'> *{errors.password.message}</span>}</Label>
          <div className="relative">
            <input
              className="border border-input px-3 py-2 text-sm placeholder:text-muted-foreground rounded-md focus:outline-gray-600 bg-[#e8f0fe] mb-1 w-full"
              placeholder='Enter your password'
              type={!showPassword ? "password" : "text"}
              {...register("password", {
                required: { value: true, message: `Please Enter Password` },
                minLength: { value: 6, message: "Min Length is 6" }
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

        </div>



        <Button className="mt-2" disabled={isSubmitting} type="submit" >Sign Up</Button>
      </form>

      <p className='mt-2'>Adready a user?
        <Link className='text-primary font-medium hover:underline ml-2' to={"/auth/login"} >Login</Link>
      </p>

    </div>
  )
}

export default Register
