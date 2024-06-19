package com.outis.crmgp.domain;

import static com.outis.crmgp.domain.ContactTestSamples.*;
import static com.outis.crmgp.domain.TaskTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.outis.crmgp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ContactTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Contact.class);
        Contact contact1 = getContactSample1();
        Contact contact2 = new Contact();
        assertThat(contact1).isNotEqualTo(contact2);

        contact2.setId(contact1.getId());
        assertThat(contact1).isEqualTo(contact2);

        contact2 = getContactSample2();
        assertThat(contact1).isNotEqualTo(contact2);
    }

    @Test
    void taskTest() {
        Contact contact = getContactRandomSampleGenerator();
        Task taskBack = getTaskRandomSampleGenerator();

        contact.addTask(taskBack);
        assertThat(contact.getTasks()).containsOnly(taskBack);

        contact.removeTask(taskBack);
        assertThat(contact.getTasks()).doesNotContain(taskBack);

        contact.tasks(new HashSet<>(Set.of(taskBack)));
        assertThat(contact.getTasks()).containsOnly(taskBack);

        contact.setTasks(new HashSet<>());
        assertThat(contact.getTasks()).doesNotContain(taskBack);
    }
}
