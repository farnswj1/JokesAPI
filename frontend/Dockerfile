# base image
FROM node:13.12.0-alpine

# set directory
WORKDIR /frontend

# install dependencies
COPY package.json package-lock.json ./
RUN npm install 
RUN npm install react-scripts@4.0.3 -g

# add application
COPY . ./
EXPOSE 3000
