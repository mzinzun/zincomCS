FROM node:lts-bullseye
WORKDIR /app

COPY package.json package.json
RUN npm install
COPY public public
COPY src src

CMD ["npm", "start"]
