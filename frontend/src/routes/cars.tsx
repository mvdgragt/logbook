import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import { carApi } from '../lib/api'
import * as ApiModule from '../lib/api'
const carApi = ApiModule.carApi
type CarType = ApiModule.Car

const carSchema = z.object({
    make: z.string().min(1, 'Märke är obligatoriskt'),
    model: z.string().min(1, 'Modell är obligatoriskt'),
    licensePlate: z.string().min(2, 'Registreringsnummer är obligatoriskt'),
})

type CarForm = z.infer<typeof carSchema>

export const Route = createFileRoute('/cars')({
    component: CarsPage,
})

function CarsPage() {
    const queryClient = useQueryClient()

    const { data: cars, isLoading } = useQuery({
        queryKey: ['cars'],
        queryFn: carApi.getAll,
    })

    const createMutation = useMutation({
        mutationFn: carApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] })
            reset()
        },
    })

    const deleteMutation = useMutation({
        mutationFn: carApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] })
        },
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CarForm>({
        resolver: zodResolver(carSchema),
    })

    const onSubmit = (data: CarForm) => {
        createMutation.mutate(data)
    }

    if (isLoading) return <p>Laddar...</p>

    return (
        <div>
            <h2>Mina bilar</h2>

            <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '2rem' }}>
                <h3>Lägg till bil</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px' }}>
                    <input {...register('make')} placeholder="Märke (t.ex. Volvo)" />
                    {errors.make && <span style={{ color: 'red' }}>{errors.make.message}</span>}

                    <input {...register('model')} placeholder="Modell (t.ex. V70)" />
                    {errors.model && <span style={{ color: 'red' }}>{errors.model.message}</span>}

                    <input {...register('licensePlate')} placeholder="Reg.nr (t.ex. ABC123)" />
                    {errors.licensePlate && <span style={{ color: 'red' }}>{errors.licensePlate.message}</span>}

                    <button type="submit" disabled={createMutation.isPending}>
                        {createMutation.isPending ? 'Sparar...' : 'Lägg till bil'}
                    </button>
                </div>
            </form>

            <h3>Bilar ({cars?.length ?? 0})</h3>
            {cars?.length === 0 && <p>Inga bilar tillagda än.</p>}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {cars?.map((car: CarType) => (
                    <li key={car.id} style={{
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>{car.make} {car.model} — {car.licensePlate}</span>
                        <button
                            onClick={() => car.id && deleteMutation.mutate(car.id)}
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