FROM node
WORKDIR /app
COPY ./package.json ./
# RUN npm install -g npm@latest
RUN npm i
COPY . .
EXPOSE 5000
USER node
# RUN ["npm", "run", "migrate"]
CMD ["npm", "run", "start"]