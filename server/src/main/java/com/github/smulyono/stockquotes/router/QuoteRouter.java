package com.github.smulyono.stockquotes.router;

import com.github.smulyono.stockquotes.handler.QuoteHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RequestPredicates.POST;
import static org.springframework.web.reactive.function.server.RequestPredicates.accept;

@Configuration
public class QuoteRouter {

    @Bean
    RouterFunction<ServerResponse> route(QuoteHandler handler) {
        return RouterFunctions
                .route(
                        GET("/hello")
                        .and(accept(MediaType.TEXT_PLAIN)),
                        handler::hello
                )
                .andRoute(
                        POST("/echo")
                        .and(accept(MediaType.TEXT_PLAIN)),
                        handler::echo
                )
                .andRoute(
                        GET("/quotes")
                        .and(accept(MediaType.APPLICATION_STREAM_JSON)),
                        handler::stream
                )
                .andRoute(
                        GET("/quotess")
                        .and(accept(MediaType.APPLICATION_JSON)),
                        handler::streamWithSize
                )

                ;
    }
}
