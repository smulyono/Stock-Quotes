package com.github.smulyono.stockquotes;

import com.github.smulyono.stockquotes.config.VantageConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(VantageConfig.class)
public class StockQuotesApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockQuotesApplication.class, args);
	}
}
