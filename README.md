# Engineering Documentation for NestJS Document Management System

### Overview

This document outlines the architecture, design, and technical implementation of the NestJS Document Management System. The application provides a backend service for user management, document storage, and ingestion processing. It leverages modern frameworks and tools like NestJS and PostgreSQL to ensure maintainability, and efficiency.

### System Architecture

#### Key Components

- Authentication and Authorization:

  - JWT-based authentication.
  - Role-based access control (RBAC) with roles: Admin, Editor, and Viewer.

- User Management:

  - CRUD operations for user metadata.
  - Admin endpoints to create admin user and update user roles.

- Document Management:

  - CRUD operations for document metadata.
  - Document upload, storage, and size validation.

- Ingestion Process:
  - Trigger ingestion for uploaded documents.
  - Poll the ingestion process for status updates.
  - Integration with an external service.
- File Storage:
  - PostgreSQL bytea type for files with 2MB size limit(can be store to S3 but due to unavailablity of paid account storing files in db as of now).
- Technologies Used
  - NestJS: Backend framework for building modular, scalable server-side applications.
  - PostgreSQL: Cloud based(render.com) Relational database for metadata and file storage.
  - TypeORM: ORM for database interactions.
  - Passport.js: Middleware for authentication.

### Application Flow

#### Step 1: User Request

The application receives an incoming request (e.g., an API call) from a client (such as Postman), accompanied by a bearer token (obtained via `/auth/login`). Users with the viewer role are limited in their access and cannot perform all CRUD operations. To update their role, they must request an admin to make the change. Additionally, there is an endpoint(`/admin/users`) that requires an extra header (`x-admin-secret: 'admin_token'`), used exclusively for creating admin users.

#### Step 2: Controller Handling

The controller is responsible for processing the HTTP request and forwarding the task to the appropriate service. It also performs input validation and enforces authorization checks through guards. Guards may restrict access to an endpoint based on conditions such as an invalid token or insufficient user roles.

#### Step 3: Service Logic

The service processes the business logic, interacts with the database (via TypeORM), and calls external APIs if needed.

#### Step 4: Database Interaction

The repository layer handles communication with the PostgreSQL database, performing queries and updates.

#### Step 5: Response

The processed result is returned from the service to the controller, which sends the final response back to the client.

#### Step 6: Ingestion

Once the ingestion process is initiated, the system interacts with an external service (in this case, a mock API built using Node and Express - https://github.com/Sumitsainits/ingestion-api-mock) to start processing the data. The ingestion service waits for a random amount of time and updates the ingestion status stored in the runtime variables.

This phase includes monitoring the progress of the ingestion process. The system tracks the current state of the ingestion (e.g., pending, in-progress, completed) and provides real-time status updates via a dedicated API.

## Instalation

Clone the repo & in root directory create an `.env` file with following keys

```
# Application
PORT=3000

# JWT
JWT_SECRET=jwt_secret
JWT_EXPIRATION=3600

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=db_user
DB_PASSWORD=db_password
DB_NAME=document_management
DB_CONNECTION_URL=db_url


### Ingestion
INGESTION_API_BASE_URL=https://example.com
```

then in terminal run following cmds

```
yarn
```

run migrations

```
yarn typeorm:run
```

build the application

```
yarn build
```

finally run

```
yarn start:prod
```

---

## API Endpoints

##### Authentication

`POST /auth/register` - Register a new user.
`POST /auth/login` - Login and receive a JWT token.

##### User Management

`POST /admin/users` - Create admin user.
`PATCH /admin/users/:userId` - Update user role.
`GET /users` - List all users.
`PATCH /users/:id` - Update user details.
`DELETE /users/:id` - Delete a user.

##### Document Management

`POST /documents` - Upload a document.
`GET /documents/:id` - Retrieve a document.
`DELETE /documents/:id` - Delete a document.

##### Ingestion

`POST /ingestion/trigger/:documentId` - Trigger the ingestion process for a document.
`GET /ingestion/status/:pid` - Get the status of an ongoing ingestion process.
