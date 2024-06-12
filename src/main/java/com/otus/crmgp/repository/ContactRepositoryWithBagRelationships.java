package com.otus.crmgp.repository;

import com.otus.crmgp.domain.Contact;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface ContactRepositoryWithBagRelationships {
    Optional<Contact> fetchBagRelationships(Optional<Contact> contact);

    List<Contact> fetchBagRelationships(List<Contact> contacts);

    Page<Contact> fetchBagRelationships(Page<Contact> contacts);
}
