import React from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useToast } from "@/hooks/use-toast"
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/auth-slice';
import { loginFormControls } from '../config';
import CommonForm from '../form';

const Login = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    //Post Request to retrieve data from database and withCredentials to have cookies set. To check if user already exits in database and on the basis of it. verifying the user
    const response = await axios.post("http://localhost:3000/api/auth/login", data, {
      withCredentials: true
    });
    if (response.data.success) {
      if (response.data.password) {
        dispatch(loginUser(response.data.user))
      }
      else
        toast({
          variant: "destructive",
          description: "Wrong Password",
        })
    }
    else {
      toast({
        variant: "destructive",
        description: "User Doesn't Exist! Please register first",
      })
      navigate("/auth/register")
    }
  }
  return (
    <div className='mx-auto w-full max-w-md text-black'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground mb-6 text-center'>Login to your account</h1>

      <CommonForm onSubmit={onSubmit} formControls={loginFormControls} buttonText="Login" />

      <p className='mt-2'>Not a member?
        <Link className='text-primary font-medium hover:underline ml-2' to={"/auth/register"} >Sign Up</Link>
      </p>

    </div>
  )
}

export default Login