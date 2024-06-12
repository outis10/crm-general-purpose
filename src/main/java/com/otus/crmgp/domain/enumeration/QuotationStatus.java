package com.otus.crmgp.domain.enumeration;

/**
 * The QuotationStatus enumeration.
 */
public enum QuotationStatus {
    DRAFT("Draft"),
    SENT("Sent"),
    ACCEPTED("Accepted"),
    REJECTED("Rejected");

    private final String value;

    QuotationStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
