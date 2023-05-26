# Stage 1
FROM node:18 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/twirch /usr/share/nginx/html

EXPOSE 4200