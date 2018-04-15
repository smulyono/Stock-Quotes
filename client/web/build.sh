#!/usr/bin/env sh

echo "Building..."
yarn install
rm -rf build
yarn build

echo "Building docker image..."
docker build --rm -t smulyono/quoteweb:latest .
