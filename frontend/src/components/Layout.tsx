import { Link, Outlet } from '@tanstack/react-router'

export function Layout() {
    return (
        <div>
            <nav style={{
                backgroundColor: '#1a1a2e',
                padding: '1rem 2rem',
                display: 'flex',
                gap: '2rem',
                alignItems: 'center'
            }}>
                <h1 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>
                    Logbook
                </h1>
                <Link
                    to="/"
                    style={{ color: 'white', textDecoration: 'none' }}
                    activeProps={{ style: { color: '#4ecca3' } }}
                >
                    Hem
                </Link>
                <Link
                    to="/cars"
                    style={{ color: 'white', textDecoration: 'none' }}
                    activeProps={{ style: { color: '#4ecca3' } }}
                >
                    Bilar
                </Link>
                <Link
                    to="/trips"
                    style={{ color: 'white', textDecoration: 'none' }}
                    activeProps={{ style: { color: '#4ecca3' } }}
                >
                    Körningar
                </Link>
            </nav>
            <main style={{ padding: '2rem' }}>
                <Outlet />
            </main>
        </div>
    )
}