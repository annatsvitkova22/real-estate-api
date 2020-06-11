FROM node:13.12.0-alpine As development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --only=development

COPY . .

RUN yarn build

FROM node:13.12.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
