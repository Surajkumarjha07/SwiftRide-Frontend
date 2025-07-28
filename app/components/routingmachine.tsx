import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

type RoutingMachineProps = {
    source: { latitude: number, longitude: number },
    destination: { latitude: number, longitude: number },
}

export default function Routingmachine({ source, destination }: RoutingMachineProps) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        let routingControl: any;

        const timeout = setTimeout(() => {
            routingControl = L.Routing.control({
                waypoints: [L.latLng(source.latitude, source.longitude), L.latLng(destination.latitude, destination.longitude)],
                routeWhileDragging: false,
                show: false,
            }).addTo(map);
        }, 100);

        return () => {
            try {
                clearTimeout(timeout);
                if (routingControl) {
                    routingControl.remove();
                }
            } catch (error) {
                console.warn('Failed to remove routing control:', error);
            }
        };

    }, [source, destination, map])

    return null;
}
