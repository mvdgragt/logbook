import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div>
            <h1>Logbook</h1>
            <p>Välkommen till din körjournal!</p>
        </div>
    )
}