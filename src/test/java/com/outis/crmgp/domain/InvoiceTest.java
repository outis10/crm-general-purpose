package com.outis.crmgp.domain;

import static com.outis.crmgp.domain.InvoiceTestSamples.*;
import static com.outis.crmgp.domain.OrderTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.outis.crmgp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class InvoiceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Invoice.class);
        Invoice invoice1 = getInvoiceSample1();
        Invoice invoice2 = new Invoice();
        assertThat(invoice1).isNotEqualTo(invoice2);

        invoice2.setId(invoice1.getId());
        assertThat(invoice1).isEqualTo(invoice2);

        invoice2 = getInvoiceSample2();
        assertThat(invoice1).isNotEqualTo(invoice2);
    }

    @Test
    void orderTest() {
        Invoice invoice = getInvoiceRandomSampleGenerator();
        Order orderBack = getOrderRandomSampleGenerator();

        invoice.setOrder(orderBack);
        assertThat(invoice.getOrder()).isEqualTo(orderBack);

        invoice.order(null);
        assertThat(invoice.getOrder()).isNull();
    }
}
