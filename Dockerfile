# Stage 1
FROM node:18 as node
WORKDIR /app
COPY . .
RUN npm install @angular/cli && npm install
EXPOSE 4200
RUN npm run build