package com.github.smulyono.stockquotes.integration;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.LinkedHashMap;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class VantageOutput {

    @JsonProperty("Meta Data")
    private VantageOutputMetadata metadata;

    @JsonProperty("Time Series (60min)")
    private LinkedHashMap<String, VantageOutputSeries> series;

    @JsonProperty("Stock Quotes")
    private List<VantageOutputQuotes> quotes;

}
