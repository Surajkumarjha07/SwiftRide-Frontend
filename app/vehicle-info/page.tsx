"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VehicleInfo() {
    const [submitClicked, setSubmitClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [showError, setShowError] = useState(false);

    const addVehicleInfo = async () => {

    }

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

    }, [])

    function handleVehicleNo(e: React.ChangeEvent<HTMLInputElement>) {
        let target = e.target as HTMLInputElement;
        if (target) {
            setVehicleNumber(target.value);
        }

        if (vehicleNumber.length < 8) {
            setShowError(true);
        }
        else {
            setShowError(false);
        }
    }

    return (
        <>
            <section className='w-screen h-screen flex justify-center items-center bg-gradient-to-b from-yellow-300 to-white'>
                <aside className="w-1/2 h-screen flex flex-col justify-center gap-6 px-20">
                    <p className="text-5xl font-bold text-gray-900 leading-tight">
                        Join as a&nbsp;
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
                    <form method='post' className='bg-white relative mx-auto h-fit mt-12 w-3/5 px-10 pt-4 pb-8 rounded-xl shadow-md shadow-gray-300'>
                        <fieldset>
                            <div className='my-6'>
                                <p className='text-center font-bold text-2xl text-gray-900'> Add Vehicle </p>
                                <p className='text-center text-xs text-gray-500 my-2'> Please enter your credentials to accept ride </p>
                            </div>

                            <div className='relative'>
                                <label className='text-sm text-gray-500 font-semibold' htmlFor='email'> Vehicle Type  </label>
                                <br />
                                <input type='text' placeholder='Enter vehicle type' name='email' className='vehicle-type h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' value={vehicleType} readOnly />
                                <br /><br />

                                {
                                    showModal &&
                                    <div className='absolute top-20 left-0 right-0 bg-gray-100 shadow-inner shadow-gray-300 rounded-2xl text-gray-500 font-medium divide-y divide-gray-300'>
                                        <p className='py-2 px-4 cursor-pointer' onClick={() => setVehicleType("bike")}> Bike </p>
                                        <p className='py-2 px-4 cursor-pointer' onClick={() => setVehicleType("car")}> Car </p>
                                        <p className='py-2 px-4 cursor-pointer' onClick={() => setVehicleType("SUV")}> SUV </p>
                                    </div>
                                }

                                <label className='text-sm text-gray-500 font-semibold' htmlFor='name'> Vehicle Number </label>
                                <br />
                                <input type='name' placeholder='Enter vehicle no.' name='name' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' onChange={(e) => handleVehicleNo(e)} />
                                {
                                    showError &&
                                    <p className='text-red-500 text-sm mt-1 font-medium'>
                                        Vehicle no. should be of 8 characters
                                    </p>
                                }

                                <div className='text-center mt-8'>
                                    <input type='submit' className={`w-full cursor-pointer ${submitClicked ? "bg-gray-800" : "bg-gray-900"} rounded-lg py-3 text-white font-semibold`} value={submitClicked ? "Signing Up..." : "Sign Up"} disabled={submitClicked} />
                                </div>

                            </div>

                        </fieldset>
                    </form>
                </aside>
            </section>
        </>
    )
}
