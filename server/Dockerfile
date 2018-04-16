FROM smulyono/dev-java:8u131

LABEL maintainer="smulyono@me.com"

ADD build/libs/server-0.0.1-SNAPSHOT.jar app.jar

ENV JAVA_OPTS=""

EXPOSE 8081

CMD java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom \
-jar app.jar
