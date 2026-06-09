import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { tripApi, carApi } from '../lib/api'
import type { Trip } from '../lib/api'

const tripSchema = z.object({
    date: z.string().min(1, 'Datum är obligatoriskt'),
    startLocation: z.string().min(1, 'Startplats är obligatorisk'),
    endLocation: z.string().min(1, 'Slutplats är obligatorisk'),
    distance: z.number().min(0.1, 'Avstånd måste vara större än 0'),
    purpose: z.string().optional(),
    carId: z.number().min(1, 'Välj en bil'),
})

type TripForm = z.infer<typeof tripSchema>

export const Route = createFileRoute('/trips')({
    component: TripsPage,
})

function TripsPage() {
    const queryClient = useQueryClient()

    const { data: trips, isLoading: tripsLoading } = useQuery({
        queryKey: ['trips'],
        queryFn: tripApi.getAll,
    })

    const { data: cars } = useQuery({
        queryKey: ['cars'],
        queryFn: carApi.getAll,
    })

    const createMutation = useMutation({
        mutationFn: (data: TripForm) => tripApi.create({
            date: data.date,
            startLocation: data.startLocation,
            endLocation: data.endLocation,
            distance: data.distance,
            purpose: data.purpose,
            car: { id: data.carId },
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] })
            reset()
        },
    })

    const deleteMutation = useMutation({
        mutationFn: tripApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['trips'] })
        },
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TripForm>({
        resolver: zodResolver(tripSchema),
    })

    const onSubmit = (data: TripForm) => {
        createMutation.mutate(data)
    }

    if (tripsLoading) return <p>Laddar...</p>

    return (
        <div>
            <h2>Mina körningar</h2>

            <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '2rem' }}>
                <h3>Logga körning</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px' }}>

                    <select {...register('carId', { valueAsNumber: true })}>
                        <option value="">Välj bil</option>
                        {cars?.map(car => (
                            <option key={car.id} value={car.id}>
                                {car.make} {car.model} — {car.licensePlate}
                            </option>
                        ))}
                    </select>
                    {errors.carId && <span style={{ color: 'red' }}>{errors.carId.message}</span>}

                    <input type="date" {...register('date')} />
                    {errors.date && <span style={{ color: 'red' }}>{errors.date.message}</span>}

                    <input {...register('startLocation')} placeholder="Startplats" />
                    {errors.startLocation && <span style={{ color: 'red' }}>{errors.startLocation.message}</span>}

                    <input {...register('endLocation')} placeholder="Slutplats" />
                    {errors.endLocation && <span style={{ color: 'red' }}>{errors.endLocation.message}</span>}

                    <input
                        type="number"
                        step="0.1"
                        {...register('distance', { valueAsNumber: true })}
                        placeholder="Avstånd (km)"
                    />
                    {errors.distance && <span style={{ color: 'red' }}>{errors.distance.message}</span>}

                    <input {...register('purpose')} placeholder="Ändamål (valfritt)" />

                    <button type="submit" disabled={createMutation.isPending}>
                        {createMutation.isPending ? 'Sparar...' : 'Logga körning'}
                    </button>
                </div>
            </form>

            <h3>Körningar ({trips?.length ?? 0})</h3>
            {trips?.length === 0 && <p>Inga körningar loggade än.</p>}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {trips?.map((trip: Trip) => (
                    <li key={trip.id} style={{
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
            <span>
              {trip.date} — {trip.startLocation} → {trip.endLocation} ({trip.distance} km)
                {trip.purpose && ` — ${trip.purpose}`}
            </span>
                        <button
                            onClick={() => trip.id && deleteMutation.mutate(trip.id)}
                            style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            Ta bort
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}