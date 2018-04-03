package com.github.smulyono.stockquotes.handler;

import com.github.smulyono.stockquotes.model.Quote;
import com.github.smulyono.stockquotes.service.QuoteGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Component
public class QuoteHandler {

    @Autowired
    private QuoteGenerator quoteGenerator;

    public Mono<ServerResponse> stream(ServerRequest request) {
        String stocks = request.queryParam("stocks")
                .orElse("");

        return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_STREAM_JSON)
                .body(quoteGenerator
                        .fetchQuoteStream(Duration.ofSeconds(3), stocks.split(",")), Quote.class);
    }

    public Mono<ServerResponse> instant(ServerRequest request) {
        String stocks = request.queryParam("stocks")
                .orElse("");

        return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(quoteGenerator
                        .getInstantQuote(stocks.split(",")), Quote.class);
    }
}
