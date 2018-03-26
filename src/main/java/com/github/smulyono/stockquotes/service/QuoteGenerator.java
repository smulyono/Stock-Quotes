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

    private final Random random = new Random();

    private final List<Quote> prices = new ArrayList<>();

    @Autowired
    private VantageClient client;

    /**
     * Bootstraps the generator with tickers and initial prices
     */
    public QuoteGenerator() {
        this.prices.add(new Quote("CTXS", 82.26));
        this.prices.add(new Quote("DELL", 63.74));
        this.prices.add(new Quote("GOOG", 847.24));
        this.prices.add(new Quote("MSFT", 65.11));
        this.prices.add(new Quote("ORCL", 45.71));
        this.prices.add(new Quote("RHT", 84.29));
        this.prices.add(new Quote("VMW", 92.21));
    }

    public Flux<Quote> fetchQuoteStream(Duration period) {

        // We want to emit quotes with a specific period;
        // to do so, we create a Flux.interval
        return Flux.interval(period)
                // In case of back-pressure, drop events
                .onBackpressureDrop()
                // For each tick, generate a list of quotes
                .map(this::generateQuotes)
                .flatMap(quoteFlux -> quoteFlux)
                // "flatten" that List<Quote> into a Flux<Quote>
//                .flatMapIterable(quotes -> quotes)
                .log(this.getClass().getName());
    }

    /*
     * Create quotes for all tickers at a single instant.
     */
    private Flux<Quote> generateQuotes(long interval) {
        String[] ticker = prices.stream()
                .map(i -> i.getTicker())
                .collect(Collectors.toList())
                .toArray(new String[prices.size()]);

        log.info("Generating quotes for {}", String.join(",", ticker));
        return this.client.getQuotes(ticker)
                .flatMapIterable(
                        (VantageOutput response) -> response.getQuotes()
                                .stream()
                                .map(quote -> {
                                    Quote result = new Quote(quote.getSymbol(),
                                            BigDecimal.valueOf(Double.valueOf(quote.getPrice())));
                                    result.setInstant(quote.getTimestamp());
                                    return result;
                                })
                                .collect(Collectors.toList())
                );
    }
}
