package com.github.smulyono.stockquotes.integration;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class VantageOutputQuotes {

    @JsonProperty("1. symbol")
    private String symbol;

    @JsonProperty("2. price")
    private String price;

    @JsonProperty("3. volume")
    private String volume;

    @JsonProperty("4. timestamp")
    private String timestamp;
}
