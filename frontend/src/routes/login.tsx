import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
    username: z.string().min(1, 'Användarnamn är obligatoriskt'),
    password: z.string().min(1, 'Lösenord är obligatoriskt'),
})

type LoginForm = z.infer<typeof loginSchema>

export const Route = createFileRoute('/login')({
    component: LoginPage,
})

function LoginPage() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginForm) => {
        const res = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (res.ok) {
            const { token } = await res.json()
            localStorage.setItem('token', token)
            navigate({ to: '/cars' })
        } else {
            alert('Fel användarnamn eller lösenord')
        }
    }

    return (
        <div style={{ maxWidth: '300px', margin: '4rem auto' }}>
            <h2>Logga in</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input {...register('username')} placeholder="Användarnamn" />
                {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}

                <input type="password" {...register('password')} placeholder="Lösenord" />
                {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}

                <button type="submit">Logga in</button>
                <a href="/register">Inget konto? Registrera dig</a>
            </form>
        </div>
    )
}