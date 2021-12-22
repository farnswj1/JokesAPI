# base image
FROM python:3.9

# set environment variables
ENV PYTHONUNBUFFERED 1

# set directory
WORKDIR /backend

# add application and install dependencies
COPY Pipfile Pipfile.lock backend ./
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile

# expose port(s)
EXPOSE 8000
