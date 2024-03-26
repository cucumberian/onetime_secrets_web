FROM node:lts-alpine3.19 as build
LABEL stage=build

ENV HOME="/home/app/"
ENV APP_HOME="/home/app/src"

#creating user and group
RUN addgroup --system app && adduser -S -h ${HOME} app

RUN mkdir -p ${APP_HOME}
WORKDIR ${APP_HOME}

COPY . ${APP_HOME}

RUN chown -R app:app ${APP_HOME}

USER app

RUN npm install
