package com.github.smulyono.stockquotes.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "vantage")
@Data
public class VantageConfig {
    private String apiKey;
}
