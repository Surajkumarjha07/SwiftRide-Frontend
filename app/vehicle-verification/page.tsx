"use client"
import axios, { isAxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Cookies from 'js-cookie';
import { setCookie } from '../redux/slices/cookie';

export default function VehicleVerification() {
    const [vehicle, setVehicle] = useState<string>("");
    const [vehicleNo, setVehicleNo] = useState<string>("");
    const [submitClicked, setSubmitClicked] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const cookie = useAppSelector(state => state.Cookie.cookie);

    useEffect(() => {
        document.addEventListener("click", (e: React.MouseEvent | MouseEvent) => {
            let target = e.target as HTMLElement;
            if (!target.classList.contains("vehicle-type")) {
                setShowModal(false);
            }

            else {
                setShowModal(true);
            }
        })

        const fetchedCookie = Cookies.get("authtoken");

        if (fetchedCookie) {
            dispatch(setCookie(fetchedCookie));
        }

    }, [])

    const verifyVehicle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSubmitClicked(true);

        if (!vehicle || !vehicleNo) {
            toast.error("Enter valid credentials!", {
                type: "error",
                hideProgressBar: true,
                autoClose: 1500,
                position: "top-center"
            })
            setSubmitClicked(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/captain/actions/verify-vehicle", {
                vehicle,
                vehicleNo
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${cookie}`
                    },
                    withCredentials: true
                },
            )

            if (response.status === 200) {
                toast.success("Congrats! vehicle verified", {
                    type: "success",
                    hideProgressBar: true,
                    autoClose: 1500,
                    position: "top-center"
                })
                setVehicle("");
                setVehicleNo("");
            }

            setSubmitClicked(false);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.message || "Internal server error!", {
                    type: "error",
                    hideProgressBar: true,
                    autoClose: 1500,
                    position: "top-center"
                })
            }
            setSubmitClicked(false);
        }
    }

    return (
        <>
            <section className='w-screen h-screen flex justify-center items-center bg-gradient-to-b from-yellow-300 to-white'>
                <aside className="w-1/2 h-screen flex flex-col justify-center gap-6 px-20">
                    <p className="text-5xl font-bold text-gray-900 leading-tight">
                        Register your,
                        {/* <AnimatePresence mode="wait">
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
                        </AnimatePresence> */}
                        <br />

                        <span className="text-yellow-500">vehicle</span>
                        &nbsp;to accept rides and get paid
                    </p>

                    <p className="text-xl text-gray-700 font-medium">
                        <Link href="/home">
                            <span className="text-gray-900 font-bold underline"> Back </span>
                        </Link>
                    </p>

                </aside>

                <aside className='w-1/2 h-screen flex justify-center items-center'>
                    <form method='post' className='bg-white relative mx-auto h-fit mt-12 w-3/5 px-10 pt-4 pb-8 rounded-xl shadow-md shadow-gray-300' onSubmit={e => verifyVehicle(e)}>
                        <fieldset>
                            <div className='my-6'>
                                <p className='text-center font-bold text-2xl text-gray-900'> Vehicle Verification </p>
                                <p className='text-center text-xs text-gray-500 my-2'> Verify your vehicle to accept rides and get paid </p>
                            </div>

                            <div className='text-left'>
                                <label className='text-sm text-gray-500 font-semibold' htmlFor='password'> Vehicle </label>
                                <br />
                                <div className='relative'>
                                    <input type='text' placeholder='bike, car, ....' name='vehicleType' className='vehicle-type h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' value={vehicle} readOnly onClick={() => setShowModal(true)} />
                                    <br /> <br />

                                    {
                                        showModal &&
                                        <div className='absolute top-14 left-0 right-0 bg-gray-100 shadow-inner shadow-gray-300 rounded-2xl text-gray-500 font-medium divide-y divide-gray-300'>
                                            <p className='py-2 px-4 cursor-pointer' onClick={() => setVehicle("bike")}> Bike </p>
                                            <p className='py-2 px-4 cursor-pointer' onClick={() => setVehicle("car")}> Car </p>
                                            <p className='py-2 px-4 cursor-pointer' onClick={() => setVehicle("SUV")}> SUV </p>
                                        </div>
                                    }
                                </div>

                                <label className='text-sm text-gray-500 font-semibold' htmlFor='password'> Vehicle Number </label>
                                <br />
                                <input type='text' placeholder='BR19EQ0001' name='password' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' onChange={e => setVehicleNo(e.target.value)} />

                                <div className='text-center mt-8'>
                                    <input type='submit' className={`w-full cursor-pointer ${submitClicked ? "bg-gray-800" : "bg-gray-900"} rounded-lg py-3 text-white font-semibold`} value={submitClicked ? "Verifying..." : "Verify"} />
                                </div>

                            </div>

                        </fieldset>
                    </form>
                </aside>
            </section>
        </>
    )
}
