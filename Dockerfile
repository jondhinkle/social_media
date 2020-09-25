FROM postgres:10

WORKDIR /app

ENV POSTGRES_DB=social_media_dev
ENV POSTGRES_USER=myspace_tom
ENV POSTGRES_PASSWORD=supersecret