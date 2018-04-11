package com.github.smulyono.stockquotes.integration;

import com.github.smulyono.stockquotes.config.VantageConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class VantageClient {

    private VantageConfig properties;

    private WebClient webClient;

    private final String baseUrl = "https://www.alphavantage.co/";

    private final String quoteUri = "/query?function=TIME_SERIES_INTRADAY&symbol={stock}&interval=60min&apikey={apikey}";
    private final String quotesUri = "/query?function=BATCH_STOCK_QUOTES&symbols={stock}&apikey={apikey}";

    public VantageClient(VantageConfig properties) {
        this.properties = properties;
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .build();
    }

    public Mono<VantageOutput> getQuote(String ticker) {
        Assert.notNull(this.properties, "Properties is null.. .cannot continue");
        return this.webClient.get()
                .uri(quoteUri, ticker, this.properties.getApiKey())
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .flatMap(clientResponse -> clientResponse.bodyToMono(VantageOutput.class))
                .log(this.getClass().getName());

    }

    public Mono<VantageOutput> getQuotes(String[] ticker) {
        Assert.notNull(this.properties, "Properties is null.. .cannot continue");
        return this.webClient.get()
                .uri(quotesUri, String.join( ",", ticker), this.properties.getApiKey())
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .flatMap(clientResponse -> clientResponse.bodyToMono(VantageOutput.class))
                .log(this.getClass().getName());

    }

}
