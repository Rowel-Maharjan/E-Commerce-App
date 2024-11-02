import React from 'react'
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    reset()
    console.log(data);
  }
  return (
    <>
      <form className='flex flex-col gap-2 text-black' onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Enter your user name' type="text" className='border border-black px-4 py-1'
          {...register("username",
            {
              required: { value: true, message: "Username is required" },
              minLength: { value: 3, message: "Min Length is 3" }
            })} />

        <input placeholder='Enter your password' type="password" className='border border-black px-4 py-1'
          {...register("password",
            {
              required: { value: true, message: "Password is required" },
              minLength: { value: 8, message: "Min Length is 8" }
            })} />

        <input placeholder='Enter your email' type="email" className='border border-black px-4 py-1'
          {...register("email",
            {
              required: { value: true, message: "Email is required" }
            })} />

        <input className='cursor-pointer border-black border' disabled={isSubmitting} type="submit" />
      </form>
    </>
  )
}

export default Login