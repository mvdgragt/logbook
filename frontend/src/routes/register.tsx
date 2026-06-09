import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const registerSchema = z.object({
    username: z.string().min(1, 'Användarnamn är obligatoriskt'),
    email: z.string().email('Ogiltig e-postadress'),
    password: z.string().min(6, 'Lösenord måste vara minst 6 tecken'),
})

type RegisterForm = z.infer<typeof registerSchema>

export const Route = createFileRoute('/register')({
    component: RegisterPage,
})

function RegisterPage() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterForm) => {
        const res = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (res.ok) {
            const { token } = await res.json()
            localStorage.setItem('token', token)
            navigate({ to: '/cars' })
        } else {
            alert('Registrering misslyckades')
        }
    }

    return (
        <div style={{ maxWidth: '300px', margin: '4rem auto' }}>
            <h2>Registrera dig</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input {...register('username')} placeholder="Användarnamn" />
                {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}

                <input type="email" {...register('email')} placeholder="E-post" />
                {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}

                <input type="password" {...register('password')} placeholder="Lösenord (minst 6 tecken)" />
                {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}

                <button type="submit">Registrera</button>
                <a href="/login">Har du redan ett konto? Logga in</a>
            </form>
        </div>
    )
}