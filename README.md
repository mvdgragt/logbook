# Logbook — Körjournal

En webbapplikation för att logga körningar för firmabil, byggd med Spring Boot och React.

## Om projektet

Logbook är en körjournal-applikation byggd som examensuppgift i kursen **Teknisk Projektledning** (CAW24G) hos Jensen Education.

Syftet är att ge min fru ett enkelt sätt att logga körningar för hennes firmabil.

## Tech Stack

### Backend
- Java 21
- Spring Boot 4.0.6
- Spring Security + JWT
- Spring Data JPA + Hibernate
- H2 (utveckling) / PostgreSQL (produktion)
- Swagger/OpenAPI (SpringDoc)

### Frontend
- React + Vite + TypeScript
- TanStack Router
- TanStack Query
- Zod + React Hook Form

### DevOps
- GitHub Actions (CI/CD)
- Git Flow (feature branches)
- GitHub Issues + Projects (Scrum)

## Kom igång

### Krav
- Java 21
- Node.js 18+
- Maven

### Starta backend

```bash
cd backend
mvn spring-boot:run
```

Backend startar på `http://localhost:8080`

### Starta frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend startar på `http://localhost:5173`

## API-dokumentation

Swagger UI finns på:
```
http://localhost:8080/swagger-ui/index.html
```

### Endpoints

| Method | URL | Beskrivning | Auth |
|--------|-----|-------------|------|
| POST | /api/auth/register | Registrera användare |
| POST | /api/auth/login | Logga in |
| GET | /api/cars | Hämta alla bilar |
| POST | /api/cars | Lägg till bil |
| DELETE | /api/cars/{id} | Ta bort bil |
| GET | /api/trips | Hämta alla körningar |
| GET | /api/trips/car/{carId} | Körningar per bil |
| POST | /api/trips | Logga körning |
| DELETE | /api/trips/{id} | Ta bort körning |

## Projektstruktur

```
logbook/
├── backend/                    # Spring Boot API
│   └── src/main/java/se/logbook/backend/
│       ├── config/             # SecurityConfig, JwtAuthFilter, OpenApiConfig
│       ├── controller/         # AuthController, CarController, TripController
│       ├── model/              # User, Car, Trip, AuthRequest, AuthResponse
│       ├── repository/         # UserRepository, CarRepository, TripRepository
│       └── service/            # AuthService, CarService, TripService, JwtService
├── frontend/                   # React + Vite
│   └── src/
│       ├── components/         # Layout
│       ├── lib/                # api.ts
│       └── routes/             # index, cars, trips, login, register
└── .github/
    └── workflows/              # ci.yml (GitHub Actions)
```

## Autentisering

Applikationen använder JWT-tokens för autentisering:

1. Registrera: `POST /api/auth/register`
2. Logga in: `POST /api/auth/login` — får tillbaka en JWT-token
3. Skicka token i header: `Authorization: Bearer <token>`

## Scrum & Projektmetodik

Projektet följde Scrum med 6 sprintar:

| Sprint | Fokus |
|--------|-------|
| Sprint 1 | Projektsetup — GitHub, Spring Boot, React, H2, CI |
| Sprint 2 | Datamodell & API — entiteter, REST, JUnit |
| Sprint 3 | Frontend — layout, formulär, TanStack |
| Sprint 4 | Autentisering — JWT, login, register |
| Sprint 5 | Testning — JUnit, GitHub Actions, UAT |
| Sprint 6 | Dokumentation & AWS |

GitHub Issues användes för backlog och GitHub Projects för Kanban-board.

## Tester

```bash
cd backend
mvn clean test
```

Testerna inkluderar:
- `CarControllerTest` — CRUD för bilar
- `TripControllerTest` — CRUD för körningar
- `AuthServiceTest` — registrering och inloggning

## Författare

**Michiel van der Gragt**