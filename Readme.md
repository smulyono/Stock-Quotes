# Stock quotes workshop

Based on [webflux-workshop](https://github.com/bclozel/webflux-workshop), to create WebFlux applications with Spring boot 2.
Couple modifications are done on this project to evaluate other capabilities of the webflux and modern web framework.

This project is used to evaluate and learning couple of these technologies / frameworks

### WebFlux

* Spring Boot 2
* Flux and Mono use case by interacting with actual api endpoint
* Retrieve stock quotes from [Vantage](https://www.alphavantage.co/), to run the application valid API key can be created from [here](https://www.alphavantage.co/support/#api-key)

### Web Applications with React

* [Webpack boot](https://github.com/smulyono/webpack-boot), to bootstrap the applications
* React 16.3 Context API
* Redux
* [Blueprint](http://blueprintjs.com/) for theme and component kit.

### Getting Started

The applications consist of client (only web) and server, which will be running as two individual process.

Getting the application started quickly, recommended to use docker. Install (Docker)[https://www.docker.com/] and follow these instructions to have them running.

* Get Vantage API Key (here)[https://www.alphavantage.co/support/#api-key]
* Put API key into docker-compose.yml

```
    environment:
      - STOCK_APIKEY=<API KEY>
```

* Build both applications (client and server)

```
cd server
chmod +x build.sh
./build.sh
```

```
cd client/web
chmod +x build.sh
./build.sh
```

* Run the docker-compose

```
docker-compose up -d
```

* Access the web client [http://localhost:8000](http://localhost:8000)
