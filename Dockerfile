FROM node:20-alpine

ENV NODE_OPTIONS="--tls-cipher-list=PROFILE=DEFAULT"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]