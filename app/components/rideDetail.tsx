import React from 'react'

export default function RideDetailLabel({ label, value }: { label: string, value?: string }) {
    return (
        <>
            <div className="flex justify-between items-start gap-8 text-gray-800 text-sm font-medium bg-gray-100 rounded-lg px-4 py-3">
                <p>{label}</p>
                <p className="text-right max-w-48 text-gray-600 italic text-wrap break-words"> {value} </p>
            </div>
        </>
    )
}
