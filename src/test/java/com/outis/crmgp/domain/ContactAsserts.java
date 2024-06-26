package com.outis.crmgp.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class ContactAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertContactAllPropertiesEquals(Contact expected, Contact actual) {
        assertContactAutoGeneratedPropertiesEquals(expected, actual);
        assertContactAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertContactAllUpdatablePropertiesEquals(Contact expected, Contact actual) {
        assertContactUpdatableFieldsEquals(expected, actual);
        assertContactUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertContactAutoGeneratedPropertiesEquals(Contact expected, Contact actual) {
        assertThat(expected)
            .as("Verify Contact auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertContactUpdatableFieldsEquals(Contact expected, Contact actual) {
        assertThat(expected)
            .as("Verify Contact relevant properties")
            .satisfies(e -> assertThat(e.getFirstName()).as("check firstName").isEqualTo(actual.getFirstName()))
            .satisfies(e -> assertThat(e.getMiddleName()).as("check middleName").isEqualTo(actual.getMiddleName()))
            .satisfies(e -> assertThat(e.getLastName()).as("check lastName").isEqualTo(actual.getLastName()))
            .satisfies(e -> assertThat(e.getEmail()).as("check email").isEqualTo(actual.getEmail()))
            .satisfies(e -> assertThat(e.getPhone()).as("check phone").isEqualTo(actual.getPhone()))
            .satisfies(e -> assertThat(e.getAddress()).as("check address").isEqualTo(actual.getAddress()))
            .satisfies(e -> assertThat(e.getCity()).as("check city").isEqualTo(actual.getCity()))
            .satisfies(e -> assertThat(e.getState()).as("check state").isEqualTo(actual.getState()))
            .satisfies(e -> assertThat(e.getPostalCode()).as("check postalCode").isEqualTo(actual.getPostalCode()))
            .satisfies(e -> assertThat(e.getCountry()).as("check country").isEqualTo(actual.getCountry()))
            .satisfies(
                e -> assertThat(e.getSocialMediaProfiles()).as("check socialMediaProfiles").isEqualTo(actual.getSocialMediaProfiles())
            )
            .satisfies(e -> assertThat(e.getNotes()).as("check notes").isEqualTo(actual.getNotes()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertContactUpdatableRelationshipsEquals(Contact expected, Contact actual) {
        assertThat(expected)
            .as("Verify Contact relationships")
            .satisfies(e -> assertThat(e.getTasks()).as("check tasks").isEqualTo(actual.getTasks()));
    }
}
