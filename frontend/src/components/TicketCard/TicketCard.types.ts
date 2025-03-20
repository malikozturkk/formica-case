export interface ITicketCard {
    travel: TravelData
    loading: boolean
    onSelect: (travelId: number) => void;
}

export interface ITicketCardsContainer {
    travelsData: TravelData[]
}

export interface TravelData {
    id: number
    departure: string
    arrival: string
    departureTime: string
    arrivalTime: string
    amount: number
    createdAt: string
    updatedAt: string
    duration: Duration
}

type Duration = {
    hours: number
    minutes: number
}