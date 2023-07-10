FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY ./src ./src

EXPOSE 5000

CMD [ "npm", "start" ]
