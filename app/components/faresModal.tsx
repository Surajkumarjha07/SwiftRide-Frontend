import React from 'react'
import { useAppDispatch } from '../redux/hooks';
import { setShowFare } from '../redux/slices/showFare';
import axios from 'axios';

export default function FaresModal({ fares }: any) {
  const dispatch = useAppDispatch();

  const cancelRide = (e: React.MouseEvent) => {
    e.preventDefault();

    dispatch(setShowFare(false));    
  }

  const confirmRide = async (e: React.MouseEvent) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:4000/user/rides/confirm-ride', {
      
    },
    {
      headers: {
        Authorization: `Bearer `
      }
    }
  );

  }

  return (
    <>
      <div className='bg-white rounded-2xl w-96 text-gray-900 h-fit z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>

        <div className='border-b'>
          <h1 className='font-semibold text-gray-900 text-xl text-center my-4'>
            Choose Ride
          </h1>
        </div>

        {
          fares.length > 0 &&
          fares.map(({ vehicle, price }: { vehicle: string, price: number }, index: any) => (
            <div key={index} className='flex justify-between items-center px-8 py-3'>
              <div>
                <p className='font-medium text-lg'> {vehicle.charAt(0).toUpperCase() + vehicle.slice(1)} </p>
                <p className='font-medium text-sm text-gray-700'> <span> ₹ </span> {price} </p>
              </div>
              <button className='text-white font-normal bg-gray-900 px-4 py-2 rounded-md cursor-pointer'>
                Confirm
              </button>
            </div>
          ))
        }


        <div className='px-8 border-t'>
          <button className='text-white w-full font-normal bg-red-500 px-4 py-2 block mx-auto rounded-md my-4 cursor-pointer' onClick={e => cancelRide(e)}>
            Cancel
          </button>
        </div>

      </div>
    </>
  )
}
