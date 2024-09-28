import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const [emailSent, setEmailSent]=useState(false);
    const [email, setEmail]=useState("");

    const {loading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }


  return (
    <div className='text-white flex justify-center items-center'>
      {
        loading?(<div>Loading ...</div>):(
            <div className='mx-auto w-11/12 md:mx-0 flex justify-center items-center flex-col mt-10 '>
                <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                    {
                        !emailSent?"Reset Your Password":"Check Your Email"
                    }
                </h1>
                <p className="mt-4 mb-3 text-[1.125rem] leading-[1.625rem] text-richblack-300">
                    {
                        !emailSent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleOnSubmit} className="flex w-[60%] flex-col gap-y-4">
                    {
                        !emailSent && (
                            <label className="w-full flex space-x-3 justify-center items-center">
                                <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5">Email Address:</p>
                                <input 
                                    required
                                    type='email'
                                    value={email}
                                    name='email'
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder='Enter Your Email Address'
                                    className='w-[70%] p-6 bg-richblack-600 text-richblack-100 rounded-[0.5rem]'
                                    style={{
                                        boxShadow: "inset 0px -3px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                />
                            </label>
                        )
                    }
                    <div className='flex justify-around items center mt-6'>
                        <button type='submit' className="rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900">
                            {
                                !emailSent?"Reset Password": "Resend Email"
                            }
                        </button>
                        <div className="rounded-[8px] bg-richblack-50 py-[8px] px-[12px] font-medium text-richblack-600 flex justify-center items-center">
                            <Link to={"/login"}>
                                <p className="mb-1 font-semibold text-[1rem] leading-[1.375rem] text-slate-500">Back to Login</p>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword
