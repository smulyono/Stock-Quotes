package com.github.smulyono.stockquotes.handler;

import com.github.smulyono.stockquotes.model.Quote;
import com.github.smulyono.stockquotes.service.QuoteGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Component
@Slf4j
public class QuoteHandler {

    @Autowired
    private QuoteGenerator quoteGenerator;

    public Mono<ServerResponse> stream(ServerRequest request) {
        String symbols = request.queryParam("symbols")
                .orElse("");
        String duration = request.queryParam("duration")
                .orElse("30");
        return ServerResponse.ok()
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(quoteGenerator
                        .fetchQuoteStream(Duration.ofSeconds(Integer.valueOf(duration)), symbols.split(",")), Quote.class);
    }

    public Mono<ServerResponse> instant(ServerRequest request) {
        String symbols = request.queryParam("symbols")
                .orElse("");

        return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(quoteGenerator
                        .getInstantQuote(symbols.split(",")), Quote.class);
    }
}
