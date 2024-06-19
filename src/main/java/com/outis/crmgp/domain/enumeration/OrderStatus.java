package com.outis.crmgp.domain.enumeration;

/**
 * The OrderStatus enumeration.
 */
public enum OrderStatus {
    PENDING("Pending"),
    PROCESSED("Processed"),
    SHIPPED("Shipped"),
    DELIVERED("Delivered"),
    CANCELLED("Cancelled");

    private final String value;

    OrderStatus(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
