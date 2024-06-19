package com.outis.crmgp.domain.enumeration;

/**
 * The NotificationType enumeration.
 */
public enum NotificationType {
    EMAIL("Email"),
    SMS,
    IN_APP("In App"),
    WHATSUP("Whatsup");

    private String value;

    NotificationType() {}

    NotificationType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
