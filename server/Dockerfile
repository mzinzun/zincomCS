FROM node:20-alpine3.19
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
WORKDIR /app

# chown is not in Docker command. It is a UNIX command
RUN chown -R node:node /app
# User redirects from root to node
USER node
COPY package.json package.json
COPY server.js server.js

COPY connection connection
COPY controllers controllers
COPY routes routes




RUN npm install

EXPOSE 8000

CMD /wait && node server.js
