
FROM node:12-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080

ENV NODE_ENV production
ENV DB_URL mongodb://mongo:27017/metacast
CMD ["npm", "start"]