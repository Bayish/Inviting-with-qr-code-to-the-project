# pull official base image
#FROM node:17.4-alpine3.14 as build-stage
#
## Stage 1
## Build docker image of react app
#
## set working directory
#RUN mkdir /usr/app
##copy all files from current directory to docker
#COPY . /usr/app
#
#WORKDIR /usr/app
#
## install and cache app dependencies
#RUN yarn
#
## add `/usr/src/app/node_modules/.bin` to $PATH
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
#
#RUN npm run build
#
## Stage 2
## Copy the react app build above in nginx
#FROM nginx:alpine
#
## Set working directory to nginx asset directory
#WORKDIR /usr/share/nginx/html
#
## Remove default nginx static assets
#RUN rm -rf ./*
#
## Copy static assets from builder stage
#COPY --from=build-stage /usr/app/build .
#
## Containers run nginx with global directives and daemon off
#ENTRYPOINT ["nginx", "-g", "daemon off;"]

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
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

# add app
COPY ./ ./

# start app
RUN npm i
CMD ["npm", "run", "start"]