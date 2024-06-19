package com.outis.crmgp.service.dto;

import com.outis.crmgp.domain.enumeration.OpportunityStage;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link com.outis.crmgp.domain.Opportunity} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OpportunityDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 2, max = 100)
    private String name;

    @NotNull
    @DecimalMin(value = "0")
    private BigDecimal amount;

    @NotNull
    @Min(value = 0)
    @Max(value = 100)
    private Integer probability;

    @NotNull
    private LocalDate expectedCloseDate;

    @NotNull
    private OpportunityStage stage;

    @Lob
    private String description;

    @NotNull
    private Instant createdAt;

    private Instant modifiedAt;

    private Instant closedAt;

    private ContactDTO contact;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getProbability() {
        return probability;
    }

    public void setProbability(Integer probability) {
        this.probability = probability;
    }

    public LocalDate getExpectedCloseDate() {
        return expectedCloseDate;
    }

    public void setExpectedCloseDate(LocalDate expectedCloseDate) {
        this.expectedCloseDate = expectedCloseDate;
    }

    public OpportunityStage getStage() {
        return stage;
    }

    public void setStage(OpportunityStage stage) {
        this.stage = stage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Instant modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public Instant getClosedAt() {
        return closedAt;
    }

    public void setClosedAt(Instant closedAt) {
        this.closedAt = closedAt;
    }

    public ContactDTO getContact() {
        return contact;
    }

    public void setContact(ContactDTO contact) {
        this.contact = contact;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OpportunityDTO)) {
            return false;
        }

        OpportunityDTO opportunityDTO = (OpportunityDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, opportunityDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OpportunityDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", amount=" + getAmount() +
            ", probability=" + getProbability() +
            ", expectedCloseDate='" + getExpectedCloseDate() + "'" +
            ", stage='" + getStage() + "'" +
            ", description='" + getDescription() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", modifiedAt='" + getModifiedAt() + "'" +
            ", closedAt='" + getClosedAt() + "'" +
            ", contact=" + getContact() +
            "}";
    }
}
