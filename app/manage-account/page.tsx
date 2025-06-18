"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch } from '../redux/hooks';
import Cookies from 'js-cookie';
import { setUserEmail, setUserName } from '../redux/slices/userCredentials';

export default function ManageAccount() {
    const [submitClicked, setSubmitClicked] = useState<boolean>(false);
    const [action, setAction] = useState<string>("update");
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");

    const handleActionType = (e: React.MouseEvent, actionType: string) => {
        e.preventDefault();
        setAction(actionType);
    }

       useEffect(() => {
        const fetchedCookie = Cookies.get("authtoken");

        if (fetchedCookie) {
            try {
                const payload = JSON.parse(atob(fetchedCookie.split(".")[1]));
                dispatch(setUserEmail(payload.userEmail));
                dispatch(setUserName(payload.userName));
                setEmail(payload.userEmail);
                setName(payload.userName);
            } catch (error) {
                console.error("Error parsing the cookie: ", error);
            }
        }

    }, [])

    return (
        <>
            <section className='py-3 w-screen h-screen bg-gradient-to-b from from-yellow-300 to-white flex justify-center items-center'>

                <aside className="w-1/2 h-screen flex flex-col justify-center gap-6 px-20">
                    <p className="text-5xl font-bold text-gray-900 leading-tight">
                        Manage your Accounts
                        <br />
                        with Us!
                        <br />
                        <AnimatePresence mode='wait'>
                            <motion.span
                                key={action}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="inline-block text-5xl font-bold text-gray-900 leading-tight"
                            >
                                {action === "update" ? (
                                    <>
                                        <span className="text-yellow-500 font-medium">Update!</span> your credentials timely to stay secure
                                    </>
                                ) : (
                                    <>
                                        <span className="text-yellow-500 font-medium">Sorry!</span> to see you go
                                    </>
                                )}
                            </motion.span>
                        </AnimatePresence>
                    </p>


                    <p className="text-xl text-gray-700 font-medium">
                        Change your mind?
                        <Link href="/home">
                            <span className="text-gray-900 font-bold underline"> Home </span>
                        </Link>
                    </p>

                </aside>

                <aside className='w-1/2 h-screen flex justify-center items-center'>
                    <form method='post' className='w-md bg-white relative mx-auto h-fit px-10 pt-4 pb-8 rounded-xl shadow-md shadow-gray-300'>
                        <fieldset>

                            <div className='w-full relative mb-4'>
                                <button className={`${action === "update" ? "text-gray-900" : "text-gray-500"} rounded-t-md w-1/2 py-3 font-medium`} onClick={(e) => handleActionType(e, "update")}>
                                    Update
                                </button>

                                <button className={`${action === "delete" ? "text-gray-900" : "text-gray-500"} rounded-t-md w-1/2 py-3 font-medium`} onClick={(e) => handleActionType(e, "delete")}>
                                    Delete
                                </button>

                                <div className={`w-1/2 h-[3px] bg-gray-900 rounded-md ${action == "update" ? "-translate-x-0" : "translate-x-full"} transition-all duration-200`} />
                            </div>

                            <div className='text-left'>

                                {
                                    action === "update" &&
                                    <>
                                        <label className='text-sm text-gray-500 font-semibold' htmlFor='email'>Email address </label>
                                        <br />
                                        <input type='email' placeholder='youremail@gmail.com' name='email' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' autoFocus value={email} onChange={e => setEmail(e.target.value)} />
                                        <br /><br />

                                        <label className='text-sm text-gray-500 font-semibold' htmlFor='name'> Name </label>
                                        <br />
                                        <input type='name' placeholder='your name' name='name' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' value={name} onChange={e => setName(e.target.value)} />
                                        <br /><br />

                                        <label className='text-sm text-gray-500 font-semibold' htmlFor='new_password'> New Password </label>
                                        <br />
                                        <input type='password' placeholder='......' name='new_password' className='h-12 mt-2 px-3 w-full placeholder:text-7xl border-2 border-gray-200 rounded-md outline-none' value={password} onChange={e => setPassword(e.target.value)} />
                                        <br /> <br />
                                    </>
                                }

                                <label className='text-sm text-gray-500 font-semibold' htmlFor='old_password'>Password </label>
                                <br />
                                <input type='password' placeholder='......' name='old_password' className='h-12 mt-2 px-3 w-full placeholder:text-7xl border-2 border-gray-200 rounded-md outline-none' value={oldPassword} onChange={e => setOldPassword(e.target.name)} />

                                {
                                    action === "update" ?

                                        <div className='text-center mt-8'>
                                            <input type='submit' className={`w-full cursor-pointer ${submitClicked ? "bg-gray-800" : "bg-gray-900"} rounded-lg py-3 text-white font-semibold`} value={submitClicked ? "Updating..." : "Update"} />
                                        </div> :
                                        <div className='text-center mt-8'>
                                            <input type='submit' className={`w-full cursor-pointer ${submitClicked ? "bg-gray-800" : "bg-gray-900"} rounded-lg py-3 text-white font-semibold`} value={submitClicked ? "Deleting..." : "Delete"} />
                                        </div>
                                }

                            </div>

                        </fieldset>
                    </form>
                </aside>

            </section>
        </>
    )
}
