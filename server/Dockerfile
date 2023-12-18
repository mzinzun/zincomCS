FROM node:20-alpine3.19

WORKDIR /app

# chown is not in Docker command. It is a UNIX command
RUN chown -R node:node /app

COPY package.json package.json
COPY server.js server.js

COPY connection connection
COPY controllers controllers
COPY routes routes


# User redirects from root to node
USER node

RUN npm install

EXPOSE 3000

CMD ["node","server.js"]
