FROM node:alpine

ENV NODE_ENV dev

ENV MONGO_URI "mongodb://mongo-auth:27018/AUTH"

ENV PORT 5000

ENV JWT_SECRET "your_secret"

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm","start"]