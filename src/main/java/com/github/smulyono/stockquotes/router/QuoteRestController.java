package com.github.smulyono.stockquotes.router;

import com.github.smulyono.stockquotes.model.Quote;
import com.github.smulyono.stockquotes.service.QuoteGenerator;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import javax.validation.constraints.NotNull;
import java.time.Duration;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class QuoteRestController {

    private final Flux<Quote> quoteStream;

    public QuoteRestController(QuoteGenerator quoteGenerator) {
        quoteStream = quoteGenerator.fetchQuoteStream(Duration.ofSeconds(5))
                        .share();
    }


    @GetMapping(value = "rQuotes", produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<Quote> getAllQuotes() {
        return quoteStream;
    }

    @GetMapping(value = "rQuotes/{size}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Flux<Quote> getQuotesWithSize(@NotNull @PathVariable("size") int size) {
        return quoteStream.take(size);
    }

}
