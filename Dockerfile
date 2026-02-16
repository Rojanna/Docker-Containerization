FROM node

WORKDIR /DOCKER-TESTAPP

ENV MONGO_DB_USERNAME=admin
ENV MONGO_DB_PWD=qwerty

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "server.js"]
