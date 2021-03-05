FROM node:14-alpine as builder

WORKDIR /app

ENV VUE_APP_RESOURCE_URL = http://localhost/api/v1

ENV VUE_APP_AUTH_URL = http://localhost/api/v1

COPY package.json ./

# RUN npm install -g @vue/cli-service

RUN yarn install --production

COPY ./ ./

RUN yarn build

FROM nginx:stable-alpine as production

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx","-g","daemon off;"]