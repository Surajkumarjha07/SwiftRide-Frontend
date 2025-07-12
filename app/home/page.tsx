'use client'
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/searchBar';
import Profile from '../components/profile';
import AccountCentre from '../components/accountCentre';
import BlackScreen from '../components/blackScreen';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setIsProfileOpen } from '../redux/slices/profile';
import { useRouter } from 'next/navigation';
import verifyToken from '../lib/verifyToken';
import coord from '../types/coordinates';
import { useSocket } from '../contexts/socketContext';
import FaresModal from '../components/faresModal';
import { setShowFare } from '../redux/slices/showFare';
import Cookies from 'js-cookie';
import { setCookie } from '../redux/slices/cookie';
import VerifyVehicle from '../components/verifyVehicle';
import { jwtDecode } from 'jwt-decode';
import { CaptainPayload, UserPayload } from '../types/payloads';
import { setShowVehicleModal } from '../redux/slices/verifyVehicle';
import AcceptRideModal from '../components/acceptRideModal';
import RidesBadge from '../components/ridesBadge';
import { setRole, setUserEmail, setUserName, setVehicleNo, setVehicleType } from '../redux/slices/userCredentials';
import RidesList from '../components/ridesList';
import { setRideData, setRides, setRidesMap } from '../redux/slices/rides';
import { toast } from 'react-toastify';
import CancelRideModal from '../components/cancelRideModal';
import { setShowCancelRideModal } from '../redux/slices/rideOptions';
import CompleteRideModal from '../components/rideCompleted';
import PaymentModal from '../components/paymentModal';

export default function UserHomePage() {
    const dispatch = useAppDispatch();
    const [coordinates, setCoordinates] = useState<coord | null>(null);
    const [showContent, setShowContent] = useState(false);
    const router = useRouter();
    const socket = useSocket();
    const [fares, setFares] = useState<{}[]>([]);
    const showFare = useAppSelector(state => state.Fare.showFare);
    const role = useAppSelector(state => state.User.role);
    const rides = useAppSelector(state => state.Rides.rides);
    const showCancelRideModal = useAppSelector(state => state.RideOptions.showCancelRideModal);
    const showCompleteRideModal = useAppSelector(state => state.RideOptions.showCompleteRideModal);

    const Map = useMemo(() => dynamic(
        () => import('../components/map'),
        {
            loading: () => <p>A map is loading!</p>,
            ssr: false
        }
    ), []);

    const verifyUser = async () => {
        const response = await verifyToken();

        if (response.ok) {
            setShowContent(true);
        }

        else {
            setShowContent(false);
            router.push("/logIn");
        }
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            console.log(latitude, longitude);

            setCoordinates({ latitude, longitude });
        },
            () => {
                console.log("error in getting current location!");
            },
            {
                enableHighAccuracy: true,
                timeout: 3000,
                maximumAge: 0
            });

        const handleClick = (e: React.MouseEvent | MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target && !target.closest(".profile") && !target.closest(".account-centre")) {
                dispatch(setIsProfileOpen(false));
            }
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [dispatch]);

    useEffect(() => {
        const fetchedCookie = Cookies.get("authtoken");

        if (fetchedCookie) {
            dispatch(setCookie(fetchedCookie));

            try {
                const payload: UserPayload & CaptainPayload = jwtDecode(fetchedCookie);

                if (payload.role === "user") {
                    dispatch(setUserEmail(payload.userEmail));
                    dispatch(setUserName(payload.userName));
                    dispatch(setRole("user"));
                }

                else {
                    dispatch(setUserEmail(payload.captainEmail));
                    dispatch(setUserName(payload.captainName));
                    dispatch(setRole("captain"));
                    dispatch(setVehicleType(payload.vehicleType));
                    dispatch(setVehicleNo(payload.vehicleNo));
                }

            } catch (error) {
                console.error("Error parsing the cookie: ", error);
            }

            const payload: CaptainPayload & UserPayload = jwtDecode(fetchedCookie);
            if (payload.role === "captain" && payload.isVehicleVerified !== "VERIFIED") {
                dispatch(setShowVehicleModal(true));
            }
        }

        verifyUser();
    }, []);

    const handleFareFetched = ({ userId, fare }: { userId: string, fare: any }) => {
        const fares = Object.entries(fare).map(([vehicle, price]) => ({
            vehicle,
            price
        }))

        setFares(fares);
        dispatch(setShowFare(true));
    }

    const handleAcceptRide = ({ captain, rideData }: { captain: Object, rideData: Object }) => {

        console.log("accept-ride: ", captain, rideData);
        const { pickUpLocation, rideId } = rideData as any;

        dispatch(setRides({ rideId, pickUpLocation }));
        dispatch(setRidesMap({ rideId, rideData }));

    }

    const handleCaptainNotFound = ({ rideData }: any) => {

        setTimeout(() => {
            console.log("captain not found", rideData);

            toast.error("Sorry! No captain available at the moment", {
                type: "error",
                hideProgressBar: true,
                autoClose: 1500,
                position: "top-center"
            });
        }, 2000);

    }

    const handleRideConfirmed = ({ rideData }: any) => {
        console.log("ride confirmed: ", rideData);

        toast.success("Ride Confirmed!", {
            type: "success",
            hideProgressBar: true,
            autoClose: 1500,
            position: "top-center"
        });

        dispatch(setShowCancelRideModal(true));

    }

    const handlePaymentRequest = ({ rideData }: any) => {
        console.log("get payment request: ", rideData);

        dispatch(setRideData(rideData));

    }

    useEffect(() => {
        if (socket) {
            socket.on("fare-fetched", handleFareFetched)
            socket.on("accept-ride", handleAcceptRide);
            socket.on("no-captain-found", handleCaptainNotFound);
            socket.on("ride-confirmed", handleRideConfirmed);
            socket.on("payment-request", handlePaymentRequest);
        }

        return () => {
            if (socket) {
                socket.off("fare-fetched", handleFareFetched);
                socket.off("accept-ride", handleAcceptRide);
                socket.off("no-captain-found", handleCaptainNotFound);
                socket.off("ride-confirmed", handleRideConfirmed);
                socket.off("payment-request", handlePaymentRequest);
            }
        }
    }, [socket])

    return (
        <>
            {
                showContent &&
                <section>
                    <div className='absolute top-3 right-5 z-30 flex justify-center items-start gap-4'>
                        {
                            showCancelRideModal &&
                            <CancelRideModal />
                        }

                        {
                            showCompleteRideModal &&
                            <CompleteRideModal />
                        }

                        {
                            role === "captain" &&
                            <div className={`flex flex-col gap-4 items-end`}>
                                <RidesBadge />
                                <RidesList rides={rides} />
                            </div>
                        }

                        <Profile />
                    </div>

                    {
                        (coordinates) &&
                        <SearchBar coordinates={coordinates} />
                    }

                    <AccountCentre />
                    <VerifyVehicle />
                    <AcceptRideModal />
                    <BlackScreen />
                    <PaymentModal/>

                    {
                        showFare &&
                        <FaresModal fares={fares} />
                    }

                    {
                        coordinates &&
                        <Map position={[coordinates?.latitude, coordinates?.longitude]} zoom={10} />
                    }
                </section>
            }
        </>
    );
}
