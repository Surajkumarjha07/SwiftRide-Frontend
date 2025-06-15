'use client'
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

type coord = {
    latitude?: number,
    longitude?: number
}

export default function UserHomePage() {
    const [coordinates, setCoordinates] = useState<coord | null>(null);

    const Map = useMemo(() => dynamic(
        () => import('../components/map'),
        {
            loading: () => <p>A map is loading!</p>,
            ssr: false
        }
    ), [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            setCoordinates({ latitude, longitude });
        },
            () => {
                console.log("error in getting current location!");
            },
            {
                enableHighAccuracy: true,
                timeout: 3000,
                maximumAge: 0
            })
    }, [])

    return (
        <>{
            coordinates == null ?
                null :
                <Map position={[coordinates?.latitude, coordinates?.longitude]} zoom={10} />
        }
        </>
    );
}
