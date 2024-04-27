
FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run migration:run
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
