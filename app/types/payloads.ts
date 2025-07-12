type UserPayload = {
    userEmail: string,
    userName: string,
    userId: string,
    role: string
}

type CaptainPayload = {
    captainEmail: string,
    captainName: string,
    captainId: string,
    role: string,
    vehicleType: string,
    vehicleNo: string,
    isVehicleVerified: string
}

export type { UserPayload, CaptainPayload };