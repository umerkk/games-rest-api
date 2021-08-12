FROM node:12-alpine

WORKDIR /usr/src/app
COPY package*.json ./

# Install API Server
RUN npm install
RUN mkdir -p build/renderer
COPY . .
CMD ["npm", "run", "build"]

# Build React Frontend
WORKDIR /usr/src/app/src/renderer
RUN npm install
RUN npm run build
RUN mv build/* /usr/src/app/build/renderer/


EXPOSE 8080

ENV NODE_ENV production
ENV DB_URL mongodb://mongo:27017/metacast
WORKDIR /usr/src/app
CMD ["npm", "start"]