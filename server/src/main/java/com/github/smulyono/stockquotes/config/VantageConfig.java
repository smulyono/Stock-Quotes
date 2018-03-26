package com.github.smulyono.stockquotes.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotBlank;

@ConfigurationProperties(prefix = "vantage")
@Data
@Validated
public class VantageConfig {
    @NotBlank
    private String apiKey;
}
