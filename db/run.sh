docker stop elecctro-db
docker rm elecctro-db

docker build -t elecctro-db .

docker run -d \
    --volume elecctro-db-volume:/var/lib/postgresql/18/docker \
    --name elecctro-db \
    -p 5455:5432 \
    -e POSTGRES_PASSWORD=examplepassword \
    -e POSTGRES_USER:postgres \
    -e POSTGRES_DB=elecctro \
    elecctro-db

    