package com.otus.crmgp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class InvoiceTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Invoice getInvoiceSample1() {
        return new Invoice().id(1L).comments("comments1");
    }

    public static Invoice getInvoiceSample2() {
        return new Invoice().id(2L).comments("comments2");
    }

    public static Invoice getInvoiceRandomSampleGenerator() {
        return new Invoice().id(longCount.incrementAndGet()).comments(UUID.randomUUID().toString());
    }
}
