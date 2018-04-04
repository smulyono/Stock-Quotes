package com.github.smulyono.stockquotes;

import com.github.smulyono.stockquotes.config.VantageConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@SpringBootApplication
@EnableConfigurationProperties(VantageConfig.class)
public class StockQuotesApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockQuotesApplication.class, args);
	}

	@Bean
	public WebFluxConfigurer corsConfigurer() {
		return new WebFluxConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/*")
						.allowedOrigins("*")
						.allowedMethods("*");
			}
		};
	}
}
