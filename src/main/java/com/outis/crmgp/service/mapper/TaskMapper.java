package com.outis.crmgp.service.mapper;

import com.outis.crmgp.domain.Contact;
import com.outis.crmgp.domain.Opportunity;
import com.outis.crmgp.domain.Task;
import com.outis.crmgp.domain.User;
import com.outis.crmgp.service.dto.ContactDTO;
import com.outis.crmgp.service.dto.OpportunityDTO;
import com.outis.crmgp.service.dto.TaskDTO;
import com.outis.crmgp.service.dto.UserDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Task} and its DTO {@link TaskDTO}.
 */
@Mapper(componentModel = "spring")
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {
    @Mapping(target = "opportunity", source = "opportunity", qualifiedByName = "opportunityId")
    @Mapping(target = "assignedTo", source = "assignedTo", qualifiedByName = "userId")
    @Mapping(target = "contacts", source = "contacts", qualifiedByName = "contactIdSet")
    TaskDTO toDto(Task s);

    @Mapping(target = "contacts", ignore = true)
    @Mapping(target = "removeContact", ignore = true)
    Task toEntity(TaskDTO taskDTO);

    @Named("opportunityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OpportunityDTO toDtoOpportunityId(Opportunity opportunity);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);

    @Named("contactId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ContactDTO toDtoContactId(Contact contact);

    @Named("contactIdSet")
    default Set<ContactDTO> toDtoContactIdSet(Set<Contact> contact) {
        return contact.stream().map(this::toDtoContactId).collect(Collectors.toSet());
    }
}
