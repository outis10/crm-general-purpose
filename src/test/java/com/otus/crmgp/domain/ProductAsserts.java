package com.otus.crmgp.domain;

import static com.otus.crmgp.domain.AssertUtils.bigDecimalCompareTo;
import static org.assertj.core.api.Assertions.assertThat;

public class ProductAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProductAllPropertiesEquals(Product expected, Product actual) {
        assertProductAutoGeneratedPropertiesEquals(expected, actual);
        assertProductAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProductAllUpdatablePropertiesEquals(Product expected, Product actual) {
        assertProductUpdatableFieldsEquals(expected, actual);
        assertProductUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProductAutoGeneratedPropertiesEquals(Product expected, Product actual) {
        assertThat(expected)
            .as("Verify Product auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProductUpdatableFieldsEquals(Product expected, Product actual) {
        assertThat(expected)
            .as("Verify Product relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()))
            .satisfies(e -> assertThat(e.getPrice()).as("check price").usingComparator(bigDecimalCompareTo).isEqualTo(actual.getPrice()))
            .satisfies(e -> assertThat(e.getStock()).as("check stock").isEqualTo(actual.getStock()))
            .satisfies(e -> assertThat(e.getSku()).as("check sku").isEqualTo(actual.getSku()))
            .satisfies(e -> assertThat(e.getCategory()).as("check category").isEqualTo(actual.getCategory()))
            .satisfies(e -> assertThat(e.getCreatedAt()).as("check createdAt").isEqualTo(actual.getCreatedAt()))
            .satisfies(e -> assertThat(e.getModifiedAt()).as("check modifiedAt").isEqualTo(actual.getModifiedAt()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertProductUpdatableRelationshipsEquals(Product expected, Product actual) {}
}