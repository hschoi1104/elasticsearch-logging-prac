FROM node:alpine

WORKDIR /app

ENV NODE_ENV dev

ENV MONGO_URI "mongodb://mongo-auth:27018/RESOURCE"

ENV PORT 3000

ENV JWT_SECRET "your_secret"

ENV accessKeyId your_key

ENV secretAccessKey your_key

ENV region ap-northeast-2

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD ["npm","start"]