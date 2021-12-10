# Jokes API
This app, built with Django, React, and Material-UI, allows 
users to read jokes that were extracted from Reddit. 

## Setup
The project uses the following:
- Python 3.9
- Django 3.2.8
- NPM
- React 17.0.2
- MySQL 8
- Nginx 1.21
- Docker

For additional information on project specifications, see 
```backend/Pipfile``` for the backend server and 
```frontend/package.json``` for the frontend respectively.

### Backend
In the ```backend``` directory, create a ```.env``` file 
that contains the following environment variables:
```
SECRET_KEY=[somerandomstring]

DEBUG=False
ALLOWED_HOSTS=localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000 http://localhost

DB_ENGINE=django.db.backends.mysql
DB_NAME=JokesAPI
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=password
DB_PORT=3306
```
The database variables can be changed is desired. 
However, make sure to update the environment variables in 
```docker-compose.yml``` as well.

### Frontend
The ```frontend``` directory must also have a ```.env``` file 
with the following variables:
```
REACT_APP_API_URL=http://localhost:8000/api/
```
The URL should be the endpoint of the backend server.

## Building
The project uses Docker. Ensure Docker and Docker Compose are installed 
before continuing.

To build, run ```docker-compose build```

## Running
To run the web app, run ```docker-compose up -d```, then 
go to http://localhost using your web browser.
