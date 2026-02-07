# Elecctro Backend Test

This is a backend test project for Elecctro TODO API.

## PostgreSQL docker

### Setup

- Build the docker image

```sh
cd db && docker build -t elecctro-db .
```

- Run the docker image

```sh
docker run -d \
    --volume elecctro-db-volume:/var/lib/postgresql/18/docker \
    --name elecctro-db \
    -p 5455:5432 \
    -e POSTGRES_PASSWORD=examplepassword \
    -e POSTGRES_USER:postgres \
    -e POSTGRES_DB=elecctro \
    elecctro-db
```

Any changes here should be reflected in `.env` POSTGRES_CONNECTION_STRING

## TODO API

### Setup

```sh
npm ci && npm run dev
```

- Navigate to http://localhost:3000/docs
