# base image
FROM node:13.12.0-alpine

# set directory
WORKDIR /frontend

# add application and install dependencies
COPY . ./
RUN npm install 
RUN npm install -g serve@13.0.2

# setup the build
RUN npm run build

# run the build
EXPOSE 3000
CMD ["serve", "-s", "build"]
