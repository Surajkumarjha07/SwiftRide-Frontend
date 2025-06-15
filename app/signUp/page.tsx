"use client"
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link'
import React, { useState } from 'react'

export default function SignUp() {
    const [role, setRole] = useState<string>("user");

    const changeSignUpType = (e: React.MouseEvent, type: string) => {
        e.preventDefault();
        setRole(type);
    }

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const target = e.target as HTMLFormElement;
            const formData = new FormData(target);
            formData.append("role", role);
            const formBody = Object.fromEntries(formData.entries());

            if (!formData.get('email')) {
                alert("enter email")
                return;
            }

            const url = role === "user" ? "http://localhost:4000/user/actions/sign-up" : "http://localhost:4000/captain/actions/registerCaptain";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formBody)
            })

            if (response.ok) {
                alert("Congrats! registered successfully");
            }

        } catch (error) {
            alert("Internal server error!");
        }
    }

    return (
        <>
            <section className='w-screen h-screen flex justify-center items-center bg-gradient-to-b from-yellow-300 to-white'>
                <aside className="w-1/2 h-screen flex flex-col justify-center gap-6 px-20">
                    <p className="text-5xl font-bold text-gray-900 leading-tight">
                        Join as a&nbsp;
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={role}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="inline-block"
                            >
                                {role === "user" ? "User!" : "Captain!"}
                            </motion.span>
                            !
                        </AnimatePresence>
                        <br />
                        <span className="text-yellow-500">Sign up</span>
                        &nbsp;to unlock smooth and reliable ride-sharing experiences
                    </p>


                    <p className="text-xl text-gray-700 font-medium">
                        Already have an account?
                        <Link href="/logIn">
                            <span className="text-gray-900 font-bold underline"> Log In </span>
                        </Link>
                    </p>

                </aside>

                <aside className='w-1/2 h-screen flex justify-center items-center'>
                    <form method='post' className='bg-white relative mx-auto h-fit mt-12 w-3/5 px-10 pt-4 pb-8 rounded-xl shadow-md shadow-gray-300' onSubmit={e => signUp(e)}>
                        <fieldset>
                            <div className='w-full relative'>
                                <button className={`${role === "user" ? "text-gray-900" : "text-gray-500"} rounded-t-md w-1/2 py-3 font-medium`} onClick={(e) => changeSignUpType(e, "user")}>
                                    User
                                </button>

                                <button className={`${role === "captain" ? "text-gray-900" : "text-gray-500"} rounded-t-md w-1/2 py-3 font-medium`} onClick={(e) => changeSignUpType(e, "captain")}>
                                    Captain
                                </button>

                                <div className={`w-1/2 h-[3px] bg-gray-900 rounded-md ${role == "user" ? "-translate-x-0" : "translate-x-full"} transition-all duration-200`} />
                            </div>

                            <div className='my-6'>
                                <p className='text-center font-bold text-2xl text-gray-900'> Create Account</p>
                                <p className='text-center text-xs text-gray-500 my-2'>Please enter your credentials to create account</p>
                            </div>

                            <div className='text-left'>
                                <label className='text-sm text-gray-500 font-semibold' htmlFor='email'>Email address </label>
                                <br />
                                <input type='email' placeholder='youremail@gmail.com' name='email' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' autoFocus />
                                <br /><br />

                                <label className='text-sm text-gray-500 font-semibold' htmlFor='email'> Name </label>
                                <br />
                                <input type='name' placeholder='your name' name='name' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' />
                                <br /><br />

                                <label className='text-sm text-gray-500 font-semibold' htmlFor='password'>Password </label>
                                <br />
                                <input type='password' placeholder='......' name='password' className='h-12 mt-2 px-3 w-full placeholder:text-7xl border-2 border-gray-200 rounded-md outline-none' />

                                <div className='text-center mt-8'>
                                    <input type='submit' className='w-full cursor-pointer bg-gray-900 rounded-lg py-3 text-white font-semibold' value={'Sign Up'} />
                                </div>

                            </div>

                        </fieldset>
                    </form>
                </aside>
            </section>
        </>
    )
}
