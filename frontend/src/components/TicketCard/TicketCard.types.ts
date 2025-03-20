export interface ITicketCard {
    travel: TravelData
}

export interface TravelData {
    id: number
    departure: string
    arrival: string
    departureTime: string
    arrivalTime: string
    createdAt: string
    updatedAt: string
    duration: Duration
}

type Duration = {
    hours: number
    minutes: number
}