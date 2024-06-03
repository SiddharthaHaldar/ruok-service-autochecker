FROM node:19-bullseye

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY [".env",".env.example","index.html","rspack.config.js","lingui.config.js","/app/"] /app/

COPY src /app/src/

RUN npm run build

COPY server.js /app/

EXPOSE 8080

CMD ["node", "server.js"]