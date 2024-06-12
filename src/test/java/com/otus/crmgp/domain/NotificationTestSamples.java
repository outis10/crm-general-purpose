package com.otus.crmgp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class NotificationTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Notification getNotificationSample1() {
        return new Notification().id(1L).message("message1").userId(1L);
    }

    public static Notification getNotificationSample2() {
        return new Notification().id(2L).message("message2").userId(2L);
    }

    public static Notification getNotificationRandomSampleGenerator() {
        return new Notification().id(longCount.incrementAndGet()).message(UUID.randomUUID().toString()).userId(longCount.incrementAndGet());
    }
}