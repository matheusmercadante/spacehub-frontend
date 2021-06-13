### ajustar dps

FROM node:14.16.0-alpine3.11 as base

RUN npm config set cache /opt/app-root/.npm-cache --global

WORKDIR /opt/app-root

EXPOSE 3000

USER node

FROM base as development

USER root

RUN npm install

RUN npm run start

USER node