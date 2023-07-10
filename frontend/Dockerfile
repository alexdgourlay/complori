FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src ./src

COPY vite.config.js index.html ./

EXPOSE 4173

RUN npm run build

CMD [ "npm", "run", "preview" ]


