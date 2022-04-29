FROM node:alpine
COPY package.json ./

RUN "npm start"

CMD ["npm","start"]

USER node
EXPOSE 8000