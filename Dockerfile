FROM node:20.18.0-alpine

WORKDIR /app

COPY yarn.lock /app

COPY package.json /app

RUN yarn install

COPY . /app

RUN yarn build

EXPOSE $API_PORT


CMD ["yarn", "dev"]