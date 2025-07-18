import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Flag, MapPin } from "lucide-react";
import { toast } from 'react-toastify';
import getLocationDetails from '../lib/getLocationDetails';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';

export default memo(function SearchBar({ coordinates }: { coordinates: { latitude: number, longitude: number } }) {
  const [location, setLocation] = useState<string>("");
  const [destination, setDestination] = useState<string | null>(null);
  const [availableLocation, setAvailableLocation] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  let timerId = useRef<NodeJS.Timeout | null>(null);
  let lastCalled: number = 0;
  const role = useAppSelector(state => state.User.role);
  const cookie = useAppSelector(state => state.Cookie.cookie);
  const showCancelRideModal = useAppSelector(state => state.RideOptions.showCancelRideModal);

  async function getCurrentLocation() {
    const locationBody: any = await getLocationDetails(coordinates);
    const location = (locationBody.road ?? "") + (locationBody.road ? ", " : "") + (locationBody.suburb ?? "") + (locationBody.suburb ? ", " : "") + (locationBody.neighbourhood ?? "") + (locationBody.neighbourhood ? ", " : "") + (locationBody.city ?? "") + (locationBody.city ? ", " : "") + (locationBody.state ?? "") + (locationBody.state ? ", " : "") + (locationBody.postcode ?? "");

    setLocation(location);
  }

  useEffect(() => {

    getCurrentLocation();

  }, [coordinates])

  const findDestination = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setDestination(value);

    if (value.length <= 1 || !value) {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      setAvailableLocation([]);
      return;
    }

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://api.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATION_IQ}&q=${value}&limit=5&dedupe=1`
        );

        setAvailableLocation(response.data);

      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            toast.error("No location found!", {
              type: "error",
              hideProgressBar: true,
              autoClose: 1500,
              position: "top-center"
            });
            setAvailableLocation([]);
          }
        }
      }
    }, 300);

  }

  const findRide = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!location || !destination) {
      toast.error("Location and destination required!", {
        type: "error",
        hideProgressBar: true,
        autoClose: 1500,
        position: "top-center"
      });
      return;
    }

    setShowLoading(true);

    const now = Date.now();

    if (Math.abs(now - lastCalled) < 2000) return;

    lastCalled = now;

    try {
      const response = await axios.post(`http://localhost:4000/user/rides/ride-request`, {
        location,
        destination
      },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie}`
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        console.log("response: ", response);
        setShowLoading(false);
      }

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
          <input type="text" name="source" className='w-full h-fit py-3 px-2 pl-8 bg-gray-100 rounded-md placeholder:text-gray-500 placeholder:text-lg outline-none shadow-inner shadow-gray-200' placeholder={role === "captain" ? "Location" : "From"} value={String(location)} onChange={e => setLocation(e.target.value)} />
        </div>

        {
          role !== "captain" &&
          <>
            <div className='relative min-w-2xs cursor-pointer'>
              <MapPin className='absolute top-1/2 left-1 -translate-y-1/2 pointer-events-none text-gray-500' />
              <input type="text" name="destination" className='w-full h-fit py-3 px-2 pl-8 bg-gray-100 rounded-md placeholder:text-gray-500 placeholder:text-lg outline-none shadow-inner shadow-gray-200' placeholder='To' value={destination ?? ""} onChange={(e) => findDestination(e)} />

              {
                availableLocation.length > 0 &&
                <div className='bg-gray-100 w-full h-fit rounded-md absolute top-16 right-0 left-0 px-4 py-3 flex flex-col gap-3 cursor-default'>
                  {
                    availableLocation.map((location: any, index) => (
                      <div key={index} className='group cursor-pointer' onClick={() => {
                        setDestination(location.display_name);
                        setAvailableLocation([]);
                      }}>
                        <p className='text-gray-900 font-semibold text-sm group-hover:text-red-500'> {location.display_name.split(",")[0]} </p>
                        <p className='text-gray-500 font-medium text-xs'> {location.display_name.split(",").slice(1)} </p>
                      </div>
                    ))
                  }
                </div>
              }

            </div>

            <button className={`px-6 py-3 font-medium text-white ${showCancelRideModal ? "bg-gray-600" : "bg-gray-900"} rounded-md cursor-pointer`} disabled={showCancelRideModal} onClick={findRide}>
              Find Ride
            </button>
          </>
        }

      </section>
    </>
  )
}
)