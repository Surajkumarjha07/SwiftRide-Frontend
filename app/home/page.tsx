'use client'
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import SearchBar from '../components/searchBar';
import Profile from '../components/profile';
import AccountCentre from '../components/accountCentre';
import BlackScreen from '../components/blackScreen';
import { useAppDispatch } from '../redux/hooks';
import { setIsProfileOpen } from '../redux/slices/profile';
import { useRouter } from 'next/navigation';
import verifyToken from '../lib/verifyToken';

type coord = {
    latitude?: number,
    longitude?: number
}

export default function UserHomePage() {
    const dispatch = useAppDispatch();
    const [coordinates, setCoordinates] = useState<coord | null>(null);
    const [showContent, setShowContent] = useState(false);
    const router = useRouter();

    const Map = useMemo(() => dynamic(
        () => import('../components/map'),
        {
            loading: () => <p>A map is loading!</p>,
            ssr: false
        }
    ), []);

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
            });

        const handleClick = (e: React.MouseEvent | MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".profile") && !target.closest(".account-centre")) {
                dispatch(setIsProfileOpen(false));
            }
        }

        document.addEventListener("click", handleClick);

        return () => document.removeEventListener("click", handleClick);
    }, []);

    const verifyUser = async () => {
        const response = await verifyToken();
        
        if (response.ok) {
            setShowContent(true);
        }

        else {
            setShowContent(false);
        }
    }

    useEffect(() => {
        verifyUser();
    }, [])

    return (
        <>
            {
                showContent &&
                <section>
                    <Profile />
                    <SearchBar />
                    <AccountCentre />
                    <BlackScreen />
                    {
                        coordinates == null ?
                            null :
                            <Map position={[coordinates?.latitude, coordinates?.longitude]} zoom={10} />
                    }
                </section>
            }
        </>
    );
}
