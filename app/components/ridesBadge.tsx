import React, { useEffect } from 'react'
import { BikeIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setShowRidesList } from '../redux/slices/ridesList';
import rideType from '../types/rideTag';

export default function RidesBadge() {
  const dispatch = useAppDispatch();
  const rides = useAppSelector(state => state.Rides.rides);
  const showRidesBadge = useAppSelector(state => state.RideOptions.showRidesBadge);

  const handleShowRidesList = (e: React.MouseEvent | MouseEvent) => {
    const target = e.target as HTMLDivElement;

    if (target && ((!target.closest(".ridesBadge") && !target.closest(".ridesList")) || (target.classList.contains("rideTag")))) {
      dispatch(setShowRidesList(false));
    }
    else {
      dispatch(setShowRidesList(true));
    }

  }

  useEffect(() => {
    document.addEventListener("click", handleShowRidesList);

    return () => {
      document.removeEventListener("click", handleShowRidesList);
    }

  }, [])

  return (
    <>
      <div className={`${showRidesBadge ? "visible" : "hidden"} relative z-30 bg-white shadow-lg rounded-xl px-3 py-2 w-fit flex gap-4 items-center cursor-pointer ridesBadge`}>
        <div className='bg-gray-200 rounded-md w-5 h-5 absolute -top-1 -right-2'>
          <p className='flex justify-center items-center w-full h-full font-medium text-sm'>
            {
              rides.length
            }
          </p>
        </div>
        <BikeIcon size={40} className='pointer-events-none' />
      </div>
    </>
  )
}
