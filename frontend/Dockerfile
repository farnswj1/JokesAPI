# base image
FROM node:13.12.0-alpine

# set directory
WORKDIR /frontend

# install dependencies
COPY package.json package-lock.json ./
RUN npm install 
RUN npm install -g react-scripts@4.0.3 serve@13.0.2

# add application
COPY . ./

# setup the build
RUN npm run build

# run the build
EXPOSE 3000
CMD ["serve", "-s", "build"]
