FROM node:current-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./package*.json ./
COPY --chown=node:node ./dist-server ./dist-server

COPY ./server/utils/firestore/keys /keys

ENV KEY_PATH='/keys/'

USER node

RUN npm install

EXPOSE 8228

CMD [ "node", "./dist-server/bin/www" ]