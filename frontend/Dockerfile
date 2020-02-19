# Use an official node runtime as a parent image
FROM node:12.6.0

WORKDIR /var/html

# Install dependencies
COPY package.json yarn.lock /

RUN npm install

# Add rest of the client code
COPY . /var/html

EXPOSE 3000

CMD npm start