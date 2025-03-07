FROM node:23-bookworm-slim

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

ENTRYPOINT [ "npm", "start" ]