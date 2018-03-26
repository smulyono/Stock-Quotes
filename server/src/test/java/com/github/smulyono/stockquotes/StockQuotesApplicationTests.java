package com.github.smulyono.stockquotes;

import com.github.smulyono.stockquotes.model.Quote;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Slf4j
public class StockQuotesApplicationTests {

	@Autowired
	private WebTestClient webTestClient;

	@Test
	public void fetchRoutes() {
		webTestClient
                .get()
                .uri("/hello")
                .exchange()
                .expectBody().toString().equalsIgnoreCase("Hello Spring");

        webTestClient
                .post()
                .uri("/echo")
                .body(Mono.just("echo"), String.class)
                .exchange()
                .expectBody().toString().equalsIgnoreCase("echo");

        List<Quote> results = webTestClient
                .get()
                .uri("/quotes")
                .exchange()
                .expectStatus().isOk()
                .expectHeader().contentType(MediaType.APPLICATION_STREAM_JSON)
                .returnResult(Quote.class)
                .getResponseBody()
                .take(30)
                .collectList()
                .block();

        log.info("Output stream {}", results);



	}

}
