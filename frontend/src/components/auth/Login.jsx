import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/Label"

const Login = () => {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <div className='mx-auto w-full max-w-md text-black'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground mb-6 text-center'>Create New Account</h1>
      <form className='flex flex-col gap-2 text-black' onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <input className='w-full border border-input px-3 py-2 text-sm placeholder:text-muted-foreground rounded-md focus:outline-gray-600 bg-[#e8f0fe]' placeholder='Enter your email' type="email"
            {...register("email",
              {
                required: { value: true, message: "Email is required" }
              })} />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password </Label>
          <input className='border border-input px-3 py-2 text-sm placeholder:text-muted-foreground rounded-md focus:outline-gray-600 bg-[#e8f0fe]' placeholder='Enter your password' type="password"
            {...register("password",
              {
                required: { value: true, message: "Password is required" }
              })} />

        </div>
        <Button className="mt-2" disabled={isSubmitting} type="submit" >Login</Button>
      </form>

      <p className='mt-2'>Not a member?
        <Link className='text-primary font-medium hover:underline ml-2' to={"/auth/register"} >Sign Up</Link>
      </p>

    </div>
  )
}

export default Login