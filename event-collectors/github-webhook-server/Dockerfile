FROM node:18-alpine

ENV NODE_ENV production

WORKDIR /app

RUN apk --no-cache add curl

COPY package*.json ./

RUN npm ci

# COPY . . 
COPY ./.env ./.env.example ./
COPY ./index.js .
COPY ./util.js .

USER node

CMD ["npm", "--no-update-notifier", "start"]

EXPOSE 3000