# Jokes API
This app allows users to read jokes that were extracted from Reddit. 


## Setup
The project uses the following:
- Python 3.9
- Django 3.2.8
- Celery 5.2.1
- NPM
- React 17.0.2
- Material-UI 5.0.4
- MySQL 8
- Redis 5
- Nginx 1.21
- Docker
- Docker Compose

For additional information on project specifications, see 
```backend/Pipfile``` for the backend server and 
```frontend/package.json``` for the frontend respectively.


### Backend
In the ```backend``` directory, create a ```.env``` file 
that contains the following environment variables:

```
SECRET_KEY=somerandomstring

DEBUG=False
ALLOWED_HOSTS=localhost
CORS_ALLOWED_ORIGIN_REGEXES=^https?://(localhost|127\.0\.0\.1)(:3000)?$

DB_ENGINE=django.db.backends.mysql
DB_NAME=JokesAPI
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=password
DB_PORT=3306

REDIS_URL=redis://redis:6379/1

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=example@gmail.com
EMAIL_HOST_PASSWORD=password
```

The database variables can be changed as desired. 
However, make sure to update the environment variables in 
```docker-compose.yml``` as well.

The email configurations can also be configured. 
For more information, see the Django 3.2 documentation.


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


## Populating the Database
This project provides data to use for the project.
Populating the database should only be done once to avoid duplicate data. 
To do so, run ```docker exec -it backend python manage.py loaddata data.json```.

To create a staff user, run ```docker exec -it backend python manage.py createsuperuser```
and fill out the fields in the prompt.
