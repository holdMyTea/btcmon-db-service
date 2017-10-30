FROM node:latest

ENV APP_HOST=localhost
ENV APP_PORT=8080
ENV DB_NAME=btcmon

ADD . /app
WORKDIR /app

ENTRYPOINT npm start

EXPOSE 8080
