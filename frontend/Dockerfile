FROM node:20-alpine as development
WORKDIR /app

RUN apk add --no-cache yarn

COPY package.json yarn.lock ./

RUN mkdir -p /deps && \
    cp package.json yarn.lock /deps/ && \
    cd /deps && \
    yarn install && \
    cp -R node_modules /app/ && \
    cd /app

COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]

FROM node:20-alpine as build
WORKDIR /app

RUN apk add --no-cache yarn

COPY package.json yarn.lock ./

RUN mkdir -p /deps && \
    cp package.json yarn.lock /deps/ && \
    cd /deps && \
    yarn install && \
    cp -R node_modules /app/ && \
    cd /app

COPY . .
RUN yarn build

FROM node:20-alpine as production
WORKDIR /app

RUN apk add --no-cache yarn

COPY package.json yarn.lock ./

RUN mkdir -p /deps && \
    cp package.json yarn.lock /deps/ && \
    cd /deps && \
    yarn install && \
    cp -R node_modules /app/ && \
    cd /app

COPY --from=build /app/.next ./.next
COPY . .

EXPOSE 3000
CMD ["yarn","start"]