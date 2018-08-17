FROM node:carbon
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get -y install autoconf automake libtool nasm make pkg-config git apt-utils

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# COPY .env ./
COPY pm2.config.json ./

RUN npm install
RUN npm rebuild

# Bundle app source
COPY dist ./dist

EXPOSE 3000
EXPOSE 9222

CMD [ "npm", "start" ]

RUN exit 0
