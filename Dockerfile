# pull official base image
FROM node:17.4-alpine3.14

## set working directory
#WORKDIR /app
#
## add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH
#
## install app dependencies
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm install --silent
#RUN npm install react-scripts@3.4.1 -g --silent
#
## add app
#COPY . ./
#
## start app
#ENTRYPOINT ["npm", "start"]
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]