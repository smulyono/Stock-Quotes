package com.github.smulyono.stockquotes.handler;

import com.github.smulyono.stockquotes.model.Quote;
import com.github.smulyono.stockquotes.service.QuoteGenerator;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Component
public class QuoteHandler {

    private final Flux<Quote> quoteStream;

    public QuoteHandler(QuoteGenerator quoteGenerator) {
        quoteStream = quoteGenerator
                        .fetchQuoteStream(Duration.ofSeconds(3))
                        .share();
    }

    public Mono<ServerResponse> hello(ServerRequest request) {
        return ServerResponse.ok()
                .body(BodyInserters.fromObject("Hello Spring"));
    }

    public Mono<ServerResponse> echo(ServerRequest request) {
        return ServerResponse.ok()
                .body(request.bodyToMono(String.class), String.class);
    }

    public Mono<ServerResponse> stream(ServerRequest request) {
        return ServerResponse.ok()
                    .contentType(MediaType.APPLICATION_STREAM_JSON)
                .body(this.quoteStream, Quote.class);
    }

    public Mono<ServerResponse> streamWithSize(ServerRequest request) {
        int size = Integer.parseInt(request.queryParam("size").orElse("10"));
        return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_STREAM_JSON)
                .body(this.quoteStream.take(size), Quote.class);
    }
}
