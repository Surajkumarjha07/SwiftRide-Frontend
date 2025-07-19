import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setShowAcceptRideModal } from '../redux/slices/rideOptions';
import rideType from '../types/rideTag';
import { setRideData, setRideId } from '../redux/slices/rides';

export default function RideTag({ ride }: { ride: rideType }) {
  const dispatch = useAppDispatch();
  const ridesMap = useAppSelector(state => state.Rides.ridesMap);
  const rideId = useAppSelector(state => state.Rides.rideId);

  const openAcceptRide = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(setRideId(ride.rideId));
    let rideData: any;

    rideData = ridesMap[ride.rideId];

    if (rideData && Object.keys(rideData).length !== 0) {
      dispatch(setRideData(rideData));
      dispatch(setShowAcceptRideModal(true));
    }

  }

  return (
    <>
      <div className='w-full h-fit px-4 py-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md cursor-pointer rideTag' onClick={openAcceptRide}>
        <h1 className='text-sm break-words text-gray-800 font-medium pointer-events-none'>
          {
            ride.rideId
          }
        </h1>
        <p className='text-gray-600 font-normal pointer-events-none'>
          <span className='text-gray-700 font-medium'> To: </span>
          {
            ride.pickUpLocation
          }
        </p>
      </div>
    </>
  )
}
