FROM node:12.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

RUN npm run tsc

COPY . .

EXPOSE 9001

CMD ["npm", "run", "prod"]