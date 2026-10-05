#docker compose at prod
docker compose --env-file .env.prod -f docker-compose-prod.yml up -d

#docker compose at dev
docker compose up -d

