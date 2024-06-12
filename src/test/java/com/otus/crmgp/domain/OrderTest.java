package com.otus.crmgp.domain;

import static com.otus.crmgp.domain.OpportunityTestSamples.*;
import static com.otus.crmgp.domain.OrderTestSamples.*;
import static com.otus.crmgp.domain.ProductTestSamples.*;
import static com.otus.crmgp.domain.QuotationTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.otus.crmgp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OrderTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Order.class);
        Order order1 = getOrderSample1();
        Order order2 = new Order();
        assertThat(order1).isNotEqualTo(order2);

        order2.setId(order1.getId());
        assertThat(order1).isEqualTo(order2);

        order2 = getOrderSample2();
        assertThat(order1).isNotEqualTo(order2);
    }

    @Test
    void opportunityTest() {
        Order order = getOrderRandomSampleGenerator();
        Opportunity opportunityBack = getOpportunityRandomSampleGenerator();

        order.setOpportunity(opportunityBack);
        assertThat(order.getOpportunity()).isEqualTo(opportunityBack);

        order.opportunity(null);
        assertThat(order.getOpportunity()).isNull();
    }

    @Test
    void productTest() {
        Order order = getOrderRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        order.setProduct(productBack);
        assertThat(order.getProduct()).isEqualTo(productBack);

        order.product(null);
        assertThat(order.getProduct()).isNull();
    }

    @Test
    void quotationTest() {
        Order order = getOrderRandomSampleGenerator();
        Quotation quotationBack = getQuotationRandomSampleGenerator();

        order.setQuotation(quotationBack);
        assertThat(order.getQuotation()).isEqualTo(quotationBack);

        order.quotation(null);
        assertThat(order.getQuotation()).isNull();
    }
}
