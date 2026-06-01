# Auth API

## Overview
Auth API is a production-style backend project built with Node.js, Express, TypeScript, PostgreSQL, and the raw `pg` driver.

This project demonstrates:

- JWT Authentication
- Refresh Token Rotation
- Refresh Token Reuse Detection
- RBAC (Role-Based Access Control)
- Zod Validation
- Swagger Documentation
- PostgreSQL Transactions
- Connection Pooling
- Window Functions
- CTEs and Recursive CTEs
- Docker & Docker Compose
- Layered Architecture
- Global Error Handling
- Security Best Practices

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- pg / pg-pool
- JWT
- bcrypt
- Zod
- Swagger
- Docker
- Docker Compose

---

## Architecture

Routes
→ Controllers
→ Services
→ Repositories
→ PostgreSQL

Responsibilities:

- Controllers: Request/Response handling
- Services: Business logic
- Repositories: SQL queries
- Middleware: Security & validation

---

## Features

### Authentication

- Register
- Login
- Logout
- Access Tokens (15 minutes)
- Refresh Tokens (7 days)
- Refresh Token Rotation
- Refresh Token Reuse Detection

### Security

- Helmet
- CORS
- Rate Limiting
- Password Hashing with bcrypt
- JWT Authentication
- RBAC Authorization

### Validation

- Zod validation on every endpoint

### Documentation

- Swagger UI
- OpenAPI specification

---

## Database Schema

### users

- id UUID PK
- name
- email UNIQUE
- password
- role
- created_at

### refresh_tokens

- id UUID PK
- user_id FK
- token
- expires_at
- created_at

---

## PostgreSQL Concepts Demonstrated

### Transactions

- BEGIN
- COMMIT
- ROLLBACK

Used during refresh token rotation.

### Window Functions

- ROW_NUMBER()
- RANK()
- LAG()
- LEAD()
- Running Totals

### CTE

```sql
WITH role_stats AS (
 SELECT role, COUNT(*) total
 FROM users
 GROUP BY role
)
SELECT * FROM role_stats;
```

### Recursive CTE

```sql
WITH RECURSIVE nums AS (
 SELECT 1
 UNION ALL
 SELECT nums + 1
 FROM nums
 WHERE nums < 10
)
SELECT * FROM nums;
```

### EXPLAIN ANALYZE

Used to compare:

- Sequential Scan
- Index Scan

Indexes:

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

---

## Connection Pooling

```ts
new Pool({
 max: 20,
 min: 2,
 idleTimeoutMillis: 30000,
 connectionTimeoutMillis: 5000
});
```

Benefits:

- Better scalability
- Reduced connection overhead
- Faster response times

---

## API Versioning

```text
/api/v1
```

Examples:

```text
POST /api/v1/auth/login
GET /api/v1/users/profile
```

---

## Authentication Flow

1. User logs in
2. Access Token issued
3. Refresh Token issued
4. Refresh Token stored in database
5. Access Token expires
6. Refresh endpoint rotates refresh token
7. Old refresh token removed
8. New refresh token saved

---

## Refresh Token Reuse Detection

If a refresh token is presented but no longer exists in the database:

- Possible token theft detected
- All user refresh tokens revoked
- User forced to log in again

---

## RBAC

Roles:

- USER
- ADMIN

Examples:

### USER

- View profile

### ADMIN

- Get all users
- Delete users
- Update roles
- View analytics

---

## Validation

Zod schemas:

- Register
- Login
- Refresh Token
- Role Updates

---

## Security

### Helmet

Adds secure HTTP headers.

### CORS

Controls frontend access.

### Rate Limiter

Protects authentication endpoints.

Example:

- 10 requests
- per 15 minutes

### bcrypt

Secure password hashing.

---

## Swagger

Swagger UI:

```text
http://localhost:5000/api-docs
```

Contains:

- Auth Endpoints
- User Endpoints
- Analytics Endpoints

---

## API Endpoints

### Auth

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
```

### Users

```text
GET    /api/v1/users/profile
GET    /api/v1/users
DELETE /api/v1/users/:id
PATCH  /api/v1/users/:id/role
```

### Analytics

```text
GET /api/v1/users/analytics
GET /api/v1/users/stats/signups
GET /api/v1/users/stats/roles
GET /api/v1/users/stats/rank
GET /api/v1/users/stats/growth
GET /api/v1/users/stats/future
```

---

## Docker

### Build

```bash
docker compose up --build
```

### Run

```bash
docker compose up
```

---

## Environment Variables

```env
PORT=5000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/authshield

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret
```

---

## Learning Outcomes

This project demonstrates:

### PostgreSQL

- Transactions
- ACID
- Connection Pooling
- Window Functions
- CTE
- Recursive CTE
- EXPLAIN ANALYZE
- Indexing

### Security

- JWT
- Access Tokens
- Refresh Tokens
- Rotation
- Reuse Detection
- bcrypt
- Helmet
- CORS
- Rate Limiting

### Backend Engineering

- TypeScript
- Layered Architecture
- Repository Pattern
- Error Handling
- Validation
- Swagger Documentation

---

## Author

Week 2 Internship Project

Auth API
