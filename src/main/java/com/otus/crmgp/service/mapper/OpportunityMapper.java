package com.otus.crmgp.service.mapper;

import com.otus.crmgp.domain.Contact;
import com.otus.crmgp.domain.Opportunity;
import com.otus.crmgp.service.dto.ContactDTO;
import com.otus.crmgp.service.dto.OpportunityDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Opportunity} and its DTO {@link OpportunityDTO}.
 */
@Mapper(componentModel = "spring")
public interface OpportunityMapper extends EntityMapper<OpportunityDTO, Opportunity> {
    @Mapping(target = "contact", source = "contact", qualifiedByName = "contactId")
    OpportunityDTO toDto(Opportunity s);

    @Named("contactId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ContactDTO toDtoContactId(Contact contact);
}
