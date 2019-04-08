export interface Origin {
    name: string
}

export interface Location {
    name: string
}

export interface Character {
    id: number,
    name: string,
    image: string,
    status: string,
    species: string,
    gender: string,
    origin: Origin,
    location: Location
}

export interface Pagination {
    pages: number,
    prev: number | null
}