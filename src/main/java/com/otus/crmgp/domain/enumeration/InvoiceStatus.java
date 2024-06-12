package com.otus.crmgp.domain.enumeration;

/**
 * The InvoiceStatus enumeration.
 */
public enum InvoiceStatus {
    PENDING("Pending"),
    PAID("Paid"),
    OVERDUE("Overdue"),
    CANCELLED("Cancelled");

    private final String value;

    InvoiceStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
