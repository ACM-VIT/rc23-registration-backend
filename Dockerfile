FROM node:18

WORKDIR /app

COPY .package.json .package-log.json /app/

RUN npm install

COPY . /app/

EXPOSE 3000

RUN npm build

CMD [ "npm", "run", "start:prod" ]