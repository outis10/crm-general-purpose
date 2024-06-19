package com.outis.crmgp.domain.enumeration;

/**
 * The OpportunityStage enumeration.
 */
public enum OpportunityStage {
    PROSPECTING("Prospecting"),
    QUALIFICATION("Qualification"),
    PROPOSAL("Proposal"),
    NEGOTIATION("Negotiation"),
    CLOSED_WON("Won"),
    CLOSED_LOST("Lost");

    private final String value;

    OpportunityStage(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
