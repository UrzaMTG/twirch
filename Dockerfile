# Stage 1
FROM node:16-alpine as node
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/twirch/ /usr/share/nginx/html

EXPOSE $PORT