"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Cookies from 'js-cookie';
import { CaptainPayload, UserPayload } from '../types/payloads';
import { setRole } from '../redux/slices/userCredentials';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ManageAccount() {
    const [submitClicked, setSubmitClicked] = useState<boolean>(false);
    const [action, setAction] = useState<string>("update");
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleNo, setVehicleNo] = useState("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [oldPassword, setOldPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    const role = useAppSelector(state => state.User.role);
    const [token, setToken] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleActionType = (e: React.MouseEvent, actionType: string) => {
        e.preventDefault();
        setAction(actionType);
    }

    useEffect(() => {
        const fetchedCookie = Cookies.get("authtoken");
        if (fetchedCookie) {
            setToken(fetchedCookie);
        }

        if (fetchedCookie) {
            try {
                const payload = JSON.parse(atob(fetchedCookie.split(".")[1]));
                console.log(payload);

                if (payload.role === "user") {
                    setEmail(payload.userEmail ?? "");
                    setName(payload.userName ?? "");
                    dispatch(setRole("user"));
                }

                else {
                    setEmail(payload.captainEmail ?? "");
                    setName(payload.captainName ?? "");
                    setVehicleType(payload.vehicleType ?? "");
                    setVehicleNo(payload.vehicleNo ?? "");
                    dispatch(setRole("captain"));
                }
            } catch (error) {
                console.error("Error parsing the cookie: ", error);
            }
        }

    }, []);

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

    const logOutURL = role === "user" ? "http://localhost:4000/user/actions/logout" : "http://localhost:4000/captain/actions/logout";

    const updateAccount = async (e: React.MouseEvent | MouseEvent) => {
        e.preventDefault();
        setSubmitClicked(true);

        if (role === "captain" && (!email && !name && !newPassword && !vehicleType && !vehicleNo)) {
            toast.error("Atleast one field is required!", {
                type: "error",
                hideProgressBar: true,
                autoClose: 1500,
                position: "top-center"
            })
            setSubmitClicked(false);
            return;
        }

        if (role === "user" && (!email && !name && !newPassword)) {
            toast.error("Atleast one field is required!", {
                type: "error",
                hideProgressBar: true,
                autoClose: 1500,
                position: "top-center"
            })
            setSubmitClicked(false);
            return;
        }

        try {
            const updateURL = role === "user" ? "http://localhost:4000/user/actions/update-user" : "http://localhost:4000/captain/actions/updateCaptain";

            const formBody = role === "user" ? { newEmail: email, newName: name, oldPassword, newPassword } : { newEmail: email, newName: name, newPassword, newVehicleType: vehicleType, newVehicleNo: vehicleNo, oldPassword }

            const response = await fetch(updateURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify(formBody)
            })

            const data = await response.json();

            if (response.ok) {
                toast.success("Congrats! Account Updated", {
                    type: "success",
                    hideProgressBar: true,
                    autoClose: 1500,
                    position: "top-center"
                });
                await fetch(logOutURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    credentials: "include",
                })
                Cookies.remove("authtoken");
                setSubmitClicked(false);
                router.push("/logIn");
            }

            else {
                toast.error(data.message, {
                    type: "error",
                    hideProgressBar: true,
                    autoClose: 1500,
                    position: "top-center"
                })
                setSubmitClicked(false);
            }

        } catch (error) {
            toast.error("Internal server error!", {
                type: "error",
                hideProgressBar: true,
                autoClose: 1500,
                position: "top-center"
            })
            setSubmitClicked(false);
        }

    }

    const deleteAccount = async (e: React.MouseEvent | MouseEvent) => {
        e.preventDefault();
        setSubmitClicked(true);

        if (!oldPassword) {
            toast.error("Password required!", {
                type: "error",
                hideProgressBar: true,
                autoClose: 1500,
                position: "top-center"
            });
            return;
        }

        try {
            const deleteUrl = role === "user" ? "http://localhost:4000/user/actions/delete-user" : "http://localhost:4000/captain/actions/deleteCaptain";

            const response = await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include",
                body: JSON.stringify({ password: oldPassword })
            })

            const data = await response.json();

            if (response.ok) {
                toast.success("Account Deleted", {
                    type: "success",
                    hideProgressBar: true,
                    autoClose: 1500,
                    position: "top-center",
                });
                await fetch(logOutURL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    credentials: "include",
                });
                Cookies.remove("authtoken");
                setSubmitClicked(false);
                router.push("/logIn");
            }

            else {
                toast.error(data.message, {
                    type: "error",
                    hideProgressBar: true,
                    autoClose: 1500,
                    position: "top-center"
                })
                setSubmitClicked(false);
            }

        } catch (error) {

        }
    }

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
                    <form method='post' className='w-md bg-gray-100 relative mx-auto h-fit px-10 pt-4 pb-8 rounded-xl shadow-md shadow-gray-300'>
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
                                        <input type='email' placeholder='youremail@gmail.com' name='email' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' autoFocus value={email} onChange={e => setEmail(e.target.value)} />
                                        <br /><br />

                                        <input type='name' placeholder='your name' name='name' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' value={name} onChange={e => setName(e.target.value)} />
                                        <br /><br />

                                        {
                                            role === "captain" &&
                                            <>
                                                <div className='relative'>
                                                    <input type='text' placeholder='bike, car, ....' name='vehicleType' className='vehicle-type h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' value={vehicleType} readOnly />
                                                    <br /> <br />

                                                    {
                                                        showModal &&
                                                        <div className='absolute top-14 left-0 right-0 bg-gray-100 shadow-inner shadow-gray-300 rounded-2xl text-gray-500 font-medium divide-y divide-gray-300'>
                                                            <p className='py-2 px-4 cursor-pointer' onClick={() => setVehicleType("bike")}> Bike </p>
                                                            <p className='py-2 px-4 cursor-pointer' onClick={() => setVehicleType("car")}> Car </p>
                                                            <p className='py-2 px-4 cursor-pointer' onClick={() => setVehicleType("SUV")}> SUV </p>
                                                        </div>
                                                    }
                                                </div>

                                                <input type='text' placeholder='78X.....455' name='vehicleNo' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} />
                                                <br /> <br />
                                            </>
                                        }

                                        <input type='password' placeholder='New Password' name='new_password' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                        <br /> <br />
                                    </>
                                }

                                <input type='password' placeholder='Password' name='old_password' className='h-12 mt-2 px-3 w-full placeholder:text-sm border-2 border-gray-200 rounded-md outline-none' value={oldPassword} onChange={e => setOldPassword(e.target.value)} />

                                {
                                    action === "update" ?

                                        <div className='text-center mt-8'>
                                            <input type='submit' className={`w-full cursor-pointer ${!oldPassword ? "hidden" : "visible"} ${submitClicked ? "bg-gray-800" : "bg-gray-900"} rounded-lg py-3 text-white font-semibold`} value={submitClicked ? "Updating..." : "Update"} onClick={updateAccount} disabled={!oldPassword} />
                                        </div> :
                                        <div className='text-center mt-8'>
                                            <input type='submit' className={`w-full cursor-pointer ${!oldPassword ? "hidden" : "visible"} ${submitClicked ? "bg-gray-800" : "bg-gray-900"} rounded-lg py-3 text-white font-semibold`} value={submitClicked ? "Deleting..." : "Delete"} onClick={deleteAccount} disabled={!oldPassword} />
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
