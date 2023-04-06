FROM node:18 AS ui-build
WORKDIR /usr/src/app
COPY twirch/ ./twirch/
RUN cd twirch && npm install @angular/cli && npm install && npm run build

FROM node:18 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/twirch/dist ./twirch/dist
COPY package*.json ./
RUN npm install
COPY server.js .

EXPOSE 3080

CMD ["node", "server.js"]