FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npx", "vite", "--host", "0.0.0.0", "--port", "3000" ]