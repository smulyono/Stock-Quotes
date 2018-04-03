package com.github.smulyono.stockquotes.service;

import com.github.smulyono.stockquotes.integration.VantageClient;
import com.github.smulyono.stockquotes.integration.VantageOutput;
import com.github.smulyono.stockquotes.model.Quote;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

import java.math.BigDecimal;
import java.math.MathContext;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Component
@Slf4j
public class QuoteGenerator {
    private final MathContext mathContext = new MathContext(2);

    @Autowired
    private VantageClient client;

    /**
     * Bootstraps the generator with tickers and initial prices
     */
    public QuoteGenerator() {
    }

    public Flux<Quote> fetchQuoteStream(Duration period, String[] ticker) {

        // We want to emit quotes with a specific period;
        // to do so, we create a Flux.interval
        return Flux.interval(period)
                // In case of back-pressure, drop events
                .onBackpressureDrop()
                // For each tick, generate a list of quotes
                .map((Long interval) -> generateQuotes(interval, ticker))
                .defaultIfEmpty(Flux.empty())
                .flatMap(quoteFlux -> quoteFlux)
                .share()
                .log(this.getClass().getName());
    }

    public Flux<Quote> getInstantQuote(String[] ticker) {

        return this.client.getQuotes(ticker)
                .flatMapIterable(
                        (VantageOutput response) ->
                                response.getQuotes()
                                        .stream()
                                        .map(quote -> {
                                            Quote result = new Quote();
                                            result.setSymbol(quote.getSymbol());
                                            result.setPrice(BigDecimal.valueOf(Double.valueOf(quote.getPrice())));
                                            result.setVolume(Long.valueOf(quote.getVolume()));
                                            result.setTimestamp(quote.getTimestamp());
                                            return result;
                                        })
                                        .collect(Collectors.toList())
                );
    }

    /*
     * Create quotes for all tickers at a single instant.
     */
    private Flux<Quote> generateQuotes(long interval, String[] ticker) {
        if (String.join(",", ticker).length() == 0) { return Flux.empty(); }
        log.info("Generating quotes for {}", String.join(",", ticker));
        return this.client.getQuotes(ticker)
                .flatMapIterable(
                        (VantageOutput response) ->
                                response.getQuotes()
                                        .stream()
                                        .map(quote -> {
                                            Quote result = new Quote();
                                            result.setSymbol(quote.getSymbol());
                                            result.setPrice(BigDecimal.valueOf(Double.valueOf(quote.getPrice())));
                                            result.setVolume(Long.valueOf(quote.getVolume()));
                                            result.setTimestamp(quote.getTimestamp());
                                            return result;
                                        })
                                        .collect(Collectors.toList())
                );
    }
}
