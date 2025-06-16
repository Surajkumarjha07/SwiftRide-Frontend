import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

export default function Routingmachine({ source, destination }: any) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        L.Routing.control({
            waypoints: [L.latLng(source[0], source[1]), L.latLng(destination[0], destination[1])],
            routeWhileDragging: false,
            show: false,
        }).addTo(map);

    }, [map])

    return null
}
