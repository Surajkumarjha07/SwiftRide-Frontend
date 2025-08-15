type UserPayload = {
    userId: string,
    userEmail: string,
    userName: string,
    role: string
}

type CaptainPayload = {
    captainId: string,
    captainEmail: string,
    captainName: string,
    role: string,
    vehicleType: string,
    vehicleNo: string,
    isVehicleVerified: string
}

export type { UserPayload, CaptainPayload };