import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setShowAcceptRideModal } from '../redux/slices/acceptRide';
import rideType from '../types/rideTag';
import { setRideData, setRideId } from '../redux/slices/rides';

export default function RideTag({ ride }: { ride: rideType }) {
  const dispatch = useAppDispatch();
  const ridesMap = useAppSelector(state => state.Rides.ridesMap);
  const rideId = useAppSelector(state => state.Rides.rideId);

  const openAcceptRide = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(setShowAcceptRideModal(true));
    dispatch(setRideId(ride.rideId));

    const rideData = ridesMap[rideId];

    dispatch(setRideData(rideData));
  }

  return (
    <>
      <div className='w-full h-fit px-4 py-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md cursor-pointer' onClick={openAcceptRide}>
        <h1 className='text-sm break-words text-gray-800 font-medium'>
          {
            ride.rideId
          }
        </h1>
        <p className='text-gray-600 font-normal'>
          <span className='text-gray-700 font-medium'> To: </span>
          {
            ride.pickUpLocation
          }
        </p>
      </div>
    </>
  )
}
