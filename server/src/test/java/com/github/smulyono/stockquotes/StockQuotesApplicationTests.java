package com.github.smulyono.stockquotes;

import com.github.smulyono.stockquotes.model.Quote;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.List;

@RunWith(SpringRunner.class)
@AutoConfigureWebTestClient(timeout = "36000")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Slf4j
public class StockQuotesApplicationTests {

	@Autowired
	private WebTestClient webTestClient;

	@Test
	public void fetchRoutes() {
		List<Quote> results = webTestClient
				.get()
				.uri("/quotes?")
				.exchange()
				.expectStatus().isOk()
				.expectHeader().contentType(MediaType.APPLICATION_STREAM_JSON)
				.returnResult(Quote.class)
				.getResponseBody()
				.take(1)
				.collectList()
				.block();
		Assert.assertNotNull(results);
		Assert.assertTrue(results.size() == 0);

        results = webTestClient
                .get()
                .uri("/quotes?stocks=GOOGL,APPL,MSFT")
                .exchange()
                .expectStatus().isOk()
                .expectHeader().contentType(MediaType.APPLICATION_STREAM_JSON)
                .returnResult(Quote.class)
                .getResponseBody()
                .take(30)
                .collectList()
                .block();

        log.info("Output stream {}", results);
        Assert.assertTrue(results.size() > 0);
	}

	@Test
	public void fetchInstantRoutes() {
		List<Quote> results = webTestClient
				.get()
				.uri("/instantquotes?stocks=AAPL,MSFT,JNPR")
				.exchange()
				.expectStatus().isOk()
				.expectHeader().contentType(MediaType.APPLICATION_JSON)
				.returnResult(Quote.class)
				.getResponseBody()
				.collectList().block();
		log.info("Output stream {}", results);
	}
}
