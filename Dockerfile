FROM node:20.18.0-alpine

WORKDIR /app

COPY package.json /app

COPY yarn.lock /app

COPY . /app

RUN yarn install --frozen-lockfile

RUN yarn build

EXPOSE 3000

CMD ["node", "./dist/main.js"]