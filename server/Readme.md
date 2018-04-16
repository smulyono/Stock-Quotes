# Stock Quote Server

Pre-requisites:

* Java 1.8+

## Getting Started

* Put the Vantage API Key into 2 separate file

```
src/main/resources/application-secret.yaml
src/test/resources/application-secret.yaml

vantage:
  api-key: <API_KEY>
```

* Build with gradle wrapper

```
./gradlew clean build
```
