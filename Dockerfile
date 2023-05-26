# Stage 1
FROM node:18 as node
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 4200
CMD ["npm", "start"]