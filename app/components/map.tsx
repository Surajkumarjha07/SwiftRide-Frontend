"use client"
import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import Routingmachine from './routingmachine'
import coords from '../types/coordinates'

type mapProps = {
    position: coords,
    destination?: coords,
    zoom: number
}

export default function Map({ position, destination, zoom }: mapProps) {

    return (
        <>
            {
                Object.keys(position).length !== 0 &&

                <MapContainer center={[position.latitude, position.longitude]} zoom={zoom} scrollWheelZoom={true} minZoom={3} maxBoundsViscosity={1.0} className='w-screen h-screen z-0'>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[position.latitude, position.longitude]}>
                        <Popup>
                            {
                                position.latitude + ", " + position.longitude
                            }
                        </Popup>
                    </Marker>

                    {
                        destination &&
                        <Routingmachine source={position} destination={{ latitude: destination.latitude, longitude: destination.longitude }} />
                    }
                </MapContainer>
            }
        </>
    )
}
