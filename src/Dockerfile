FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
RUN npm install typescript -g
RUN npm i typeorm -g
RUN npm run build
EXPOSE 3000
CMD ["node","dist/index.js"]
