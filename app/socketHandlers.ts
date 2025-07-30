import { useAppDispatch } from './redux/hooks';
import { setFare, setShowFare } from './redux/slices/showFare';
import { addRide, setRideData, setRideId, setRidesMap } from './redux/slices/rides';
import { toast } from 'react-toastify';
import { setShowCancelRideModal, setShowCompleteRideModal, setShowRidesBadge } from './redux/slices/rideOptions';
import { setShowPaymentsModal } from './redux/slices/payments';
import { useSocket } from './contexts/socketContext';
import { setShowChatBadge } from './redux/slices/chat';

export default function SocketHandlers() {
    const dispatch = useAppDispatch();
    let timeoutId: NodeJS.Timeout | undefined = undefined;
    const socket = useSocket();

    const handleFareFetched = ({ userId, fareDetails }: { userId: string, fareDetails: number }) => {
        console.log("fareDetails: ", fareDetails);

        const fares: Array<{ vehicle: string, price: number }> = Object.entries(fareDetails).map(([vehicle, price]) => ({
            vehicle,
            price
        }));

        dispatch(setFare(fares));
        dispatch(setShowFare(true));
    }

    const handleAcceptRide = ({ captain, rideData }: { captain: Object, rideData: Object }) => {

        console.log("accept-ride: ", captain, rideData);
        const { pickUpLocation, rideId } = rideData as any;

        dispatch(addRide({ rideId, pickUpLocation }));
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

        dispatch(setShowChatBadge(true));

        dispatch(setShowCancelRideModal(true));
        if (rideData) {
            dispatch(setRideData(rideData));
            dispatch(setRideId(rideData.rideId));
        }

        if (socket && rideData) {
            socket.emit("initiate-chat", { rideData }, (res: any) => {
                if (res.status === "joined") {
                    console.log("✅ User joined room:", res.roomId);
                }
            });
        }

        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            dispatch(setShowCancelRideModal(false));
        }, 5 * (60 * 1000));
    }

    const handlePaymentRequest = ({ rideData }: any) => {
        console.log("get payment request: ", rideData);

        dispatch(setRideData(rideData));
        dispatch(setShowPaymentsModal(true));
    }

    const handleRideCancelled = ({ rideData }: any) => {
        toast.error("Ride cancelled by user!", {
            type: "error",
            hideProgressBar: true,
            autoClose: 1500,
            position: "top-center"
        });

        dispatch(setShowCompleteRideModal(false));
        dispatch(setShowRidesBadge(true));
        dispatch(setShowChatBadge(false));
    }

    const handlePaymentProcessed = ({ fare, payment_id, orderId, order, userId, rideId, captainId }: any) => {
        toast.success("Payment processed!", {
            type: "success",
            hideProgressBar: true,
            autoClose: 1500,
            position: "top-center"
        });

        dispatch(setShowCompleteRideModal(false));
        dispatch(setShowRidesBadge(true));
        dispatch(setShowChatBadge(false));
    }

    return {
        handleFareFetched,
        handleRideConfirmed,
        handleRideCancelled,
        handleCaptainNotFound,
        handleAcceptRide,
        handlePaymentRequest,
        handlePaymentProcessed,
    }
}
