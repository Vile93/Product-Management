FROM node:22.15-alpine

WORKDIR /app/

COPY ./client/package*.json ./client/
RUN cd ./client && npm ci
COPY ./client/ ./client/
COPY ./shared ./shared
RUN cd ./client && npm run build
RUN mv ./client/dist ./client/public
COPY ./server/package*.json ./server/
RUN cd ./server && npm ci
COPY ./server/ ./server/
RUN cd ./server && npm run build
RUN mv ./client/public ./server/dist/server/src

EXPOSE 3000

WORKDIR /app/server

CMD ["npm", "start"]













