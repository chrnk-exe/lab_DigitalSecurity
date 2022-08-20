FROM node:latest-alpine
WORKDIR /app
COPY ./package.json ./
RUN ["npm", "i"]
COPY . .
CMD ["npm", "run", "start"]