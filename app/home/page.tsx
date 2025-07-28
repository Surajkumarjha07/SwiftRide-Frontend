'use client'
import dynamic from 'next/dynamic';
import { useEffect, useMemo} from 'react';
import SearchBar from '../components/searchBar';
import Profile from '../components/profile';
import AccountCentre from '../components/accountCentre';
import BlackScreen from '../components/blackScreen';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setIsProfileOpen } from '../redux/slices/profile';
import { useRouter } from 'next/navigation';
import verifyToken from '../lib/verifyToken';
import { useSocket } from '../contexts/socketContext';
import FaresModal from '../components/faresModal';
import Cookies from 'js-cookie';
import { setCookie } from '../redux/slices/cookie';
import { jwtDecode } from 'jwt-decode';
import { CaptainPayload, UserPayload } from '../types/payloads';
import { setShowVehicleModal } from '../redux/slices/verifyVehicle';
import AcceptRideModal from '../components/acceptRideModal';
import RidesBadge from '../components/ridesBadge';
import { setRole, setUserEmail, setUserId, setUserName, setVehicleNo, setVehicleType } from '../redux/slices/userCredentials';
import RidesList from '../components/ridesList';
import CancelRideModal from '../components/cancelRideModal';
import CompleteRideModal from '../components/rideCompleted';
import PaymentModal from '../components/paymentModal';
import { setLocationCoordinates } from '../redux/slices/locationCoordinates';
import ChatModal from '../components/chatModal';
import ChatBadge from '../components/chatBadge';
import VerifyVehicleModal from '../components/verifyVehicleModal';
import trackLocation from '../services/trackLocation.service';
import SocketHandlers from '../socketHandlers';
import { setShowContent } from '../redux/slices/showContent';

export default function UserHomePage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const socket = useSocket();
    const showFare = useAppSelector(state => state.Fare.showFare);
    const role = useAppSelector(state => state.User.role);
    const rides = useAppSelector(state => state.Rides.rides);
    const showCancelRideModal = useAppSelector(state => state.RideOptions.showCancelRideModal);
    const showCompleteRideModal = useAppSelector(state => state.RideOptions.showCompleteRideModal);
    const destinationCoordinates = useAppSelector(state => state.LocationCoordinates.destinationCoordinates);
    const locationCoordinates = useAppSelector(state => state.LocationCoordinates.locationCoordinates);
    const showContent = useAppSelector(state => state.ContentVisibility.showContent);
    const cookie = useAppSelector(state => state.Cookie.cookie);
    const fares = useAppSelector(state => state.Fare.fares);
    const {
        handleAcceptRide,
        handleCaptainNotFound,
        handleFareFetched,
        handlePaymentProcessed,
        handlePaymentRequest,
        handleRideCancelled,
        handleRideConfirmed
    } = SocketHandlers();

    const Map = useMemo(() => dynamic(
        () => import('../components/map'),
        {
            loading: () => <p>A map is loading!</p>,
            ssr: false
        }
    ), []);

    useEffect(() => {
        const fetchedCookie = Cookies.get("authtoken");

        let payload = {} as UserPayload & CaptainPayload;

        if (fetchedCookie) {
            dispatch(setCookie(fetchedCookie));

            try {
                payload = jwtDecode(fetchedCookie);

            } catch (error) {
                console.error("Error parsing the cookie: ", error);
            }

            if (payload.role === "user") {
                dispatch(setUserId(payload.userId));
                dispatch(setUserEmail(payload.userEmail));
                dispatch(setUserName(payload.userName));
                dispatch(setRole("user"));
            }

            else {
                dispatch(setUserId(payload.captainId));
                dispatch(setUserEmail(payload.captainEmail));
                dispatch(setUserName(payload.captainName));
                dispatch(setRole("captain"));
                dispatch(setVehicleType(payload.vehicleType));
                dispatch(setVehicleNo(payload.vehicleNo));
            }

            if (payload.role === "captain" && payload.isVehicleVerified !== "VERIFIED") {
                dispatch(setShowVehicleModal(true));
            }
        }

        (async () => {
            const userVerified = await verifyToken();

            if (!userVerified) {
                dispatch(setShowContent(false));
                router.push("/logIn");
                return;
            }

            dispatch(setShowContent(true));

        })();

    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                console.log(latitude, longitude);

                dispatch(setLocationCoordinates({ latitude, longitude }));

                await trackLocation(role, latitude, longitude, cookie);

            },
                () => {
                    console.log("error in getting current location!");
                },
                {
                    enableHighAccuracy: true,
                    timeout: 3000,
                    maximumAge: 0
                });

        }, 10 * 1000);

        return () => {
            clearInterval(interval);
        }
    }, [role, cookie, locationCoordinates]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            console.log(latitude, longitude);

            if (latitude && longitude) {
                dispatch(setLocationCoordinates({ latitude, longitude }));
            }
        },
            () => {
                console.log("error in getting current location!");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
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
        if (socket) {
            socket.on("fare-fetched", handleFareFetched)
            socket.on("accept-ride", handleAcceptRide);
            socket.on("no-captain-found", handleCaptainNotFound);
            socket.on("ride-confirmed", handleRideConfirmed);
            socket.on("payment-request", handlePaymentRequest);
            socket.on("ride-cancelled", handleRideCancelled);
            socket.on("payment-processed", handlePaymentProcessed);
        }

        return () => {
            if (socket) {
                socket.off("fare-fetched", handleFareFetched);
                socket.off("accept-ride", handleAcceptRide);
                socket.off("no-captain-found", handleCaptainNotFound);
                socket.off("ride-confirmed", handleRideConfirmed);
                socket.off("payment-request", handlePaymentRequest);
                socket.off("ride-cancelled", handleRideCancelled);
                socket.off("payment-processed", handlePaymentProcessed);
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
                        locationCoordinates &&
                        <SearchBar coordinates={locationCoordinates} />
                    }

                    <AccountCentre />
                    <VerifyVehicleModal />
                    <AcceptRideModal />
                    <BlackScreen />
                    <PaymentModal />

                    {
                        <div className='absolute bottom-10 left-10 z-50 flex flex-col justify-center items-start gap-4'>
                            <ChatModal />
                            <ChatBadge />
                        </div>
                    }

                    {
                        showFare &&
                        <FaresModal fares={fares} />
                    }

                    {
                        (Object.keys(locationCoordinates).length !== 0 && typeof locationCoordinates.latitude === "number" && typeof locationCoordinates.longitude === "number") &&
                        <Map position={locationCoordinates} destination={destinationCoordinates} zoom={10} />
                    }
                </section>
            }
        </>
    );
}
