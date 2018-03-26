package com.github.smulyono.stockquotes.integration;

import com.github.smulyono.stockquotes.StockQuotesApplication;
import lombok.extern.slf4j.Slf4j;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.LinkedHashMap;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Slf4j
public class VantageClientTest {

    @Autowired
    private VantageClient vantageClient;

    @Test
    public void getQuote() {
        VantageOutput output = vantageClient.getQuote("MSFT")
                .block();
        Assert.assertNotNull(output);
        Assert.assertNotNull(output.getMetadata());

        // validate metadata
        VantageOutputMetadata metadata = output.getMetadata();
        Assert.assertEquals("MSFT", metadata.getSymbol());
        Assert.assertEquals("60min", metadata.getInterval());
        Assert.assertEquals("Compact", metadata.getOutputSize());
        log.info("Metadata {}", metadata);

        // validate series
        LinkedHashMap<String, VantageOutputSeries> series = output.getSeries();
        Assert.assertNotNull(series);
        Assert.assertTrue(series.size() > 0);
        log.info("Series {}", series);
    }

    @Test
    public void getQuotes() {
        VantageOutput output = vantageClient.getQuotes(new String[]{"AAPL", "FB", "GOGL", "MSFT"})
                .block();
        log.info(output.toString());
        Assert.assertNotNull(output);
        Assert.assertNotNull(output.getMetadata());

        // validate metadata
        VantageOutputMetadata metadata = output.getMetadata();
        log.info("Metadata {}", metadata);

        // validate series
        LinkedHashMap<String, VantageOutputSeries> series = output.getSeries();
        Assert.assertNull(series);

        // validate quotes
        output.getQuotes()
                .stream()
                .forEach(i -> {
                    log.info(i.toString());
                });
    }

}