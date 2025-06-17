import React from 'react'
import { Flag, MapPin } from "lucide-react";

export default function SearchBar() {
  return (
    <>
        <section className='bg-white flex items-center gap-4 absolute top-3 left-5 z-30 rounded-md px-4 py-2 drop-shadow-md drop-shadow-gray-400'>
            <div className='relative min-w-2xs cursor-pointer'>
            <Flag className='absolute top-1/2 left-1 -translate-y-1/2 pointer-events-none text-gray-500'/>
            <input type="text" name="source" className='w-full h-fit py-3 px-2 pl-8 bg-gray-100 rounded-md placeholder:text-gray-500 placeholder:text-lg outline-none shadow-inner shadow-gray-200' placeholder='From'/>
            </div>

            <div className='relative min-w-2xs cursor-pointer'>
            <MapPin className='absolute top-1/2 left-1 -translate-y-1/2 pointer-events-none text-gray-500'/>
            <input type="text" name="source" className='w-full h-fit py-3 px-2 pl-8 bg-gray-100 rounded-md placeholder:text-gray-500 placeholder:text-lg outline-none shadow-inner shadow-gray-200' placeholder='To'/>
            </div>

            <button className='px-6 py-3 font-medium text-white bg-gray-900 rounded-md'>
                Find Ride
            </button>
        </section>
    </>
  )
}
