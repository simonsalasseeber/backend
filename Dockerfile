
FROM node
WORKDIR /app
COPY package*.json ./
# Instala Python y node-gyp
RUN apk add --no-cache python2 make g++

RUN npm install
# Reconstruye las dependencias nativas (como bcrypt) para Linux
RUN npm rebuild bcrypt --build-from-source
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
