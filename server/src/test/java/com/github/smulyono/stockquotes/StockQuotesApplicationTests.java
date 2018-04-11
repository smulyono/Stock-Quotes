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
		webTestClient
				.get()
				.uri("/quotes?duration=2")
				.exchange()
				.expectStatus().isOk()
				.expectHeader().contentType(MediaType.TEXT_EVENT_STREAM)
				.expectBody().isEmpty();

		List<Quote> results = webTestClient
                .get()
                .uri("/quotes?symbols=GOOGL,APPL,MSFT&duration=1")
                .exchange()
                .expectStatus().isOk()
                .expectHeader().contentType(MediaType.TEXT_EVENT_STREAM)
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
				.uri("/instantquotes?symbols=AAPL,MSFT,JNPR")
				.exchange()
				.expectStatus().isOk()
				.expectHeader().contentType(MediaType.APPLICATION_JSON)
				.returnResult(Quote.class)
				.getResponseBody()
				.collectList().block();
		log.info("Output stream {}", results);
	}
}
