package com.otus.crmgp.domain;

import static com.otus.crmgp.domain.ContactTestSamples.*;
import static com.otus.crmgp.domain.OpportunityTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.otus.crmgp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OpportunityTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Opportunity.class);
        Opportunity opportunity1 = getOpportunitySample1();
        Opportunity opportunity2 = new Opportunity();
        assertThat(opportunity1).isNotEqualTo(opportunity2);

        opportunity2.setId(opportunity1.getId());
        assertThat(opportunity1).isEqualTo(opportunity2);

        opportunity2 = getOpportunitySample2();
        assertThat(opportunity1).isNotEqualTo(opportunity2);
    }

    @Test
    void contactTest() {
        Opportunity opportunity = getOpportunityRandomSampleGenerator();
        Contact contactBack = getContactRandomSampleGenerator();

        opportunity.setContact(contactBack);
        assertThat(opportunity.getContact()).isEqualTo(contactBack);

        opportunity.contact(null);
        assertThat(opportunity.getContact()).isNull();
    }
}
