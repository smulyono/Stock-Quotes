package com.github.smulyono.stockquotes.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.MathContext;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quote {
    private static final MathContext MATH_CONTEXT = new MathContext(2);

    private String symbol;

    private BigDecimal price;

    private Long volume;

    private String timestamp;

    public void setPriceAsDouble(Double price) {
        this.setPrice(new BigDecimal(price, MATH_CONTEXT));
    }
}
