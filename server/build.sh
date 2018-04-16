#!/usr/bin/env bash

echo "Building ..."
./gradlew clean build

echo "Building docker image ..."
docker build --rm -t smulyono/quoteserver .