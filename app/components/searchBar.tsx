import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Flag, MapPin } from "lucide-react";
import { toast } from 'react-toastify';
import getLocationDetails from '../lib/getLocationDetails';
import locationAutoComplete from '../lib/locationAutoComplete';

export default memo(function SearchBar({ coordinates }: { coordinates: { latitude: number, longitude: number } }) {
  const [location, setLocation] = useState<string>("");
  const [destination, setDestination] = useState("");
  const [availableLocation, setAvailableLocation] = useState([]);

  async function getCurrentLocation() {
    const locationBody: any = await getLocationDetails(coordinates);
    const location = (locationBody.road ?? "") + ", " + (locationBody.suburb ?? "") + ", " + (locationBody.neighbourhood ?? "") + ", " + (locationBody.city ?? "") + ", " + (locationBody.state ?? "") + ", " + (locationBody.postcode ?? "");

    setLocation(location);
  }

  useEffect(() => {
    getCurrentLocation();
  }, [coordinates])

  const findDestination = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setDestination(value);

      console.log("dest: ", value);

      if (value.length <= 1) {
        setAvailableLocation([]);
      }

      if (value && value.length > 1) {
        locationAutoComplete(value, (response: any) => {
          console.log("response in component: ", response);
          setAvailableLocation(response)
        });
      }
    },
    [destination],
  )

  const findRide = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {


    } catch (error) {
      toast.error("Internal server error!", {
        type: "error",
        hideProgressBar: true,
        autoClose: 1500,
        position: "top-center"
      })
    }

  }

  return (
    <>
      <section className='bg-white flex items-center gap-4 absolute top-3 left-5 z-30 rounded-md px-4 py-2 drop-shadow-md drop-shadow-gray-400'>
        <div className='relative min-w-2xs cursor-pointer'>
          <Flag className='absolute top-1/2 left-1 -translate-y-1/2 pointer-events-none text-gray-500' />
          <input type="text" name="source" className='w-full h-fit py-3 px-2 pl-8 bg-gray-100 rounded-md placeholder:text-gray-500 placeholder:text-lg outline-none shadow-inner shadow-gray-200' placeholder='From' value={String(location)} onChange={e => setLocation(e.target.value)} />
        </div>

        <div className='relative min-w-2xs cursor-pointer'>
          <MapPin className='absolute top-1/2 left-1 -translate-y-1/2 pointer-events-none text-gray-500' />
          <input type="text" name="source" className='w-full h-fit py-3 px-2 pl-8 bg-gray-100 rounded-md placeholder:text-gray-500 placeholder:text-lg outline-none shadow-inner shadow-gray-200' placeholder='To' value={destination} onChange={(e) => findDestination(e)} />

          {
            availableLocation.length > 0 &&
            <div className='bg-gray-100 w-full h-fit rounded-md absolute top-16 right-0 left-0 px-4 py-3 flex flex-col gap-3 cursor-default'>
              {
                availableLocation.map((location: any, index) => (
                  <div key={index} className='group cursor-pointer'>
                    <p className='text-gray-900 font-semibold text-sm group-hover:text-red-500'> {location.display_name.split(",")[0]} </p>
                    <p className='text-gray-500 font-medium text-xs'> {location.display_name.split(",").slice(1)} </p>
                  </div>
                ))
              }
            </div>
          }

        </div>

        <button className='px-6 py-3 font-medium text-white bg-gray-900 rounded-md'>
          Find Ride
        </button>
      </section>
    </>
  )
}
)