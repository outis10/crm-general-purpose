package com.otus.crmgp.domain;

import static com.otus.crmgp.domain.OpportunityTestSamples.*;
import static com.otus.crmgp.domain.ProductTestSamples.*;
import static com.otus.crmgp.domain.QuotationTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.otus.crmgp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class QuotationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Quotation.class);
        Quotation quotation1 = getQuotationSample1();
        Quotation quotation2 = new Quotation();
        assertThat(quotation1).isNotEqualTo(quotation2);

        quotation2.setId(quotation1.getId());
        assertThat(quotation1).isEqualTo(quotation2);

        quotation2 = getQuotationSample2();
        assertThat(quotation1).isNotEqualTo(quotation2);
    }

    @Test
    void opportunityTest() {
        Quotation quotation = getQuotationRandomSampleGenerator();
        Opportunity opportunityBack = getOpportunityRandomSampleGenerator();

        quotation.setOpportunity(opportunityBack);
        assertThat(quotation.getOpportunity()).isEqualTo(opportunityBack);

        quotation.opportunity(null);
        assertThat(quotation.getOpportunity()).isNull();
    }

    @Test
    void productTest() {
        Quotation quotation = getQuotationRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        quotation.setProduct(productBack);
        assertThat(quotation.getProduct()).isEqualTo(productBack);

        quotation.product(null);
        assertThat(quotation.getProduct()).isNull();
    }
}
