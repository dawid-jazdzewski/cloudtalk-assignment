# Cloudtalk assignment

## Environment Variables

- APP_PORT - Port on which the application will run (default: 3000)
- APP_NAME - Name of the application
- APP_API_PREFIX - Prefix for API routes (default: api)
- AUTH_ACCESS_TOKEN_SECRET - Secret key for generating access tokens
- AUTH_ACCESS_TOKEN_EXPIRES_IN - Expiry time for access tokens in seconds
- DATABASE_TYPE - Type of the database (e.g., postgres)
- DATABASE_URL - Connection URL for the database (e.g., postgresql://username:password@host:port/database)
- DATABASE_HOST - Database host
- DATABASE_PORT - Database port
- DATABASE_USERNAME - Database username
- DATABASE_PASSWORD - Database password
- DATABASE_NAME - Database name
- DATABASE_LOGGING - Whether database logging is enabled (true/false)
- DATABASE_SYNCHRONIZE - Whether database synchronization is enabled (true/false)
- DATABASE_MAX_CONNECTIONS - Maximum number of database connections
- DATABASE_SSL_ENABLED - Whether SSL is enabled for the database (true/false)
- DATABASE_REJECT_UNAUTHORIZED - Whether unauthorized SSL connections should be rejected (true/false)
- DATABASE_RUN_MIGRATIONS - Whether database migrations should be run on startup (true/false)
- DATABASE_RUN_SEED - Whether database seeding should be performed on startup (true/false)
- DATABASE_SEED_USERNAME - Username for the seeded user account
- DATABASE_SEED_PASSWORD - Password for the seeded user account

## Comfortable startup

```bash
cp .env.example .env
npm run docker:up
```

Available services:

- http://localhost:3000 - API
- http://localhost:3000/docs - Swagger documentation
- http://localhost:8080 - Adminer
  ```
  System: PostgreSQL
  Server: postgres
  Username: root
  Password: secret
  Database: api
  ```

## Development startup

```bash
cp .env.example .env
```

Update .env file

```
DATABASE_HOST=localhost
```

Run containers:

```bash
npm run docker:dev
```

Run dev server

```bash
npm i
npm run start:dev
```

## Migrations

Migrations are automatically generated based on entities defined in TypeORM. To generate a migration, use the following command:

```bash
npm run migration:generate -- ./src/database/migrations/<migration-name>
```

To create an empty migration file manually, use:

```bash
npm run migration:create -- ./src/database/migrations/<migration-name>
```

To apply pending migrations, run:

```bash
npm run migration:run
```

To revert the most recent migration, run:

```bash
npm run migration:revert
```

## Seeding the Database

To seed the database with a sample user account, ensure that the DATABASE_RUN_SEED environment variable is set to true. A seed user account will be created with the username specified in DATABASE_SEED_USERNAME and the password specified in DATABASE_SEED_PASSWORD.

## Postman Collection

Explore the API endpoints conveniently in Postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/octopus-int/workspace/cloudtalk-assignment/collection/17075421-7f85bb4e-b655-4338-ae3e-6d6c95dadc00)
