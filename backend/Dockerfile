FROM node:20-alpine as development
WORKDIR /app

RUN apk add --no-cache yarn openssl

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

COPY package.json yarn.lock ./

RUN mkdir -p /deps && \
    cp package.json yarn.lock /deps/ && \
    cd /deps && \
    yarn install && \
    cp -R node_modules /app/ && \
    cd /app

COPY . .

RUN yarn prisma generate

EXPOSE 4000
CMD ["sh", "-c", "rm -rf dist/* && yarn start:dev"]

FROM node:20-alpine as production
WORKDIR /app

RUN apk add --no-cache yarn openssl

COPY package.json yarn.lock ./

RUN mkdir -p /deps && \
    cp package.json yarn.lock /deps/ && \
    cd /deps && \
    yarn install --frozen-lockfile && \
    cp -R node_modules /app/ && \
    cd /app

COPY . .

RUN yarn prisma generate

RUN npm cache clean --force

RUN yarn build
EXPOSE 4000
CMD ["yarn", "start"] 