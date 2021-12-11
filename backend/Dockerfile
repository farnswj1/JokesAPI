# base image
FROM python:3.9

# set environment variables
ENV PYTHONUNBUFFERED 1

# set directory
WORKDIR /backend

# install dependencies
COPY Pipfile Pipfile.lock ./
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile

# add application
COPY backend ./
EXPOSE 8000
