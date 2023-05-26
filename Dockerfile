FROM node:18 AS ui-build
WORKDIR /app
COPY . .
RUN npm install @angular/cli && npm install && npm run build

FROM nginx:alpine
COPY --from=node /app/dist/twirch /usr/share/nginx/html