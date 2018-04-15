FROM smulyono/dev-nodejs:v8

LABEL maintainer="smulyono@me.com"

ADD build /opt/target

RUN echo "Installing serve package " && \
  yarn global add serve

EXPOSE 3000

ENTRYPOINT [ "serve", "-s", "/opt/target", "-p", "3000" ]
