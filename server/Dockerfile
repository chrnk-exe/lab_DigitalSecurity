FROM node
WORKDIR /app
COPY ./package.json ./
# RUN npm install -g npm@latest
RUN npm install
RUN npm install lodash@4.15.0
COPY . .
EXPOSE 5000
USER node
# RUN ["npm", "run", "migrate"]
CMD ["npm", "run", "start"]