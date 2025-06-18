"use client"
import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import Routingmachine from './routingmachine'

export default function Map({ position, zoom }: any) {
    
    return (
        <>
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} minZoom={3} maxBoundsViscosity={1.0} className='w-screen h-screen z-0'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        {
                            position[0] + ", " + position[1]
                        }
                    </Popup>
                </Marker>

                <Marker position={[19.760, 72.700]}>
                </Marker>
                <Routingmachine source={position} destination={[19.760, 72.700]} />
            </MapContainer>
        </>
    )
}
