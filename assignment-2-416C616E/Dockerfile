FROM node:9

WORKDIR /var/app/businesses

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8000
EXPOSE ${PORT}

CMD ["npm", "start"]
