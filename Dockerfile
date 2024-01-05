FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npm install -g ts-node

RUN npx prisma migrate dev --name init

RUN npx prisma generate

COPY . .
