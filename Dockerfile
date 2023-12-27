FROM node:21.5-alpine3.18 as buildbase

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.25-alpine3.18

COPY --from=buildbase /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=buildbase /app/dist /usr/share/nginx/html