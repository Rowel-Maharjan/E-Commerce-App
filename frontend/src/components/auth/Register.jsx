import React from 'react'
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/Label"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/auth-slice';


const Register = () => {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    const response = await axios.post("http://localhost:3000/api/auth/register", data);
    await dispatch(registerUser())
    reset()
    navigate("/auth/login")
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
                required: { value: true, message: "Username is required" },
                minLength: { value: 3, message: "Min Length is 3" }
              })} />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email {errors.email && <span className='text-sm ml-2 text-red-600'> *{errors.email.message}</span>}</Label>
          <input className='w-full border border-input px-3 py-2 text-sm placeholder:text-muted-foreground rounded-md focus:outline-gray-600 bg-[#e8f0fe]' placeholder='Enter your email' type="email"
            {...register("email",
              {
                required: { value: true, message: "Email is required" }
              })} />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password {errors.password && <span className='text-sm ml-2 text-red-600'> *{errors.password.message}</span>}</Label>
          <input className='border border-input px-3 py-2 text-sm placeholder:text-muted-foreground rounded-md focus:outline-gray-600 bg-[#e8f0fe]' placeholder='Enter your password' type="password"
            {...register("password",
              {
                required: { value: true, message: "Password is required" },
                minLength: { value: 6, message: "Min Length is 6" }
              })} />

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
