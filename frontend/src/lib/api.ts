const BASE_URL = 'http://localhost:8080/api';

const getToken = () => localStorage.getItem('token');

const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
});

// Types
export interface Car {
    id?: number;
    make: string;
    model: string;
    licensePlate: string;
}

export interface Trip {
    id?: number;
    date: string;
    startLocation: string;
    endLocation: string;
    distance: number;
    purpose?: string;
    car: { id: number };
}

// Car API
export const carApi = {
    getAll: async (): Promise<Car[]> => {
        const res = await fetch(`${BASE_URL}/cars`, {
            headers: authHeaders(),
        });
        return res.json();
    },

    create: async (car: Car): Promise<Car> => {
        const res = await fetch(`${BASE_URL}/cars`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(car),
        });
        return res.json();
    },

    delete: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/cars/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        });
    },
};

// Trip API
export const tripApi = {
    getAll: async (): Promise<Trip[]> => {
        const res = await fetch(`${BASE_URL}/trips`, {
            headers: authHeaders(),
        });
        return res.json();
    },

    getByCarId: async (carId: number): Promise<Trip[]> => {
        const res = await fetch(`${BASE_URL}/trips/car/${carId}`, {
            headers: authHeaders(),
        });
        return res.json();
    },

    create: async (trip: Trip): Promise<Trip> => {
        const res = await fetch(`${BASE_URL}/trips`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(trip),
        });
        return res.json();
    },

    delete: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/trips/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        });
    },
};