package com.otus.crmgp.domain;

import static com.otus.crmgp.domain.ContactTestSamples.*;
import static com.otus.crmgp.domain.OpportunityTestSamples.*;
import static com.otus.crmgp.domain.TaskTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.otus.crmgp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class TaskTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Task.class);
        Task task1 = getTaskSample1();
        Task task2 = new Task();
        assertThat(task1).isNotEqualTo(task2);

        task2.setId(task1.getId());
        assertThat(task1).isEqualTo(task2);

        task2 = getTaskSample2();
        assertThat(task1).isNotEqualTo(task2);
    }

    @Test
    void opportunityTest() {
        Task task = getTaskRandomSampleGenerator();
        Opportunity opportunityBack = getOpportunityRandomSampleGenerator();

        task.setOpportunity(opportunityBack);
        assertThat(task.getOpportunity()).isEqualTo(opportunityBack);

        task.opportunity(null);
        assertThat(task.getOpportunity()).isNull();
    }

    @Test
    void contactTest() {
        Task task = getTaskRandomSampleGenerator();
        Contact contactBack = getContactRandomSampleGenerator();

        task.addContact(contactBack);
        assertThat(task.getContacts()).containsOnly(contactBack);
        assertThat(contactBack.getTasks()).containsOnly(task);

        task.removeContact(contactBack);
        assertThat(task.getContacts()).doesNotContain(contactBack);
        assertThat(contactBack.getTasks()).doesNotContain(task);

        task.contacts(new HashSet<>(Set.of(contactBack)));
        assertThat(task.getContacts()).containsOnly(contactBack);
        assertThat(contactBack.getTasks()).containsOnly(task);

        task.setContacts(new HashSet<>());
        assertThat(task.getContacts()).doesNotContain(contactBack);
        assertThat(contactBack.getTasks()).doesNotContain(task);
    }
}
