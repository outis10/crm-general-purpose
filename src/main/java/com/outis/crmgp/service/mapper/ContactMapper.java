package com.outis.crmgp.service.mapper;

import com.outis.crmgp.domain.Contact;
import com.outis.crmgp.domain.Task;
import com.outis.crmgp.service.dto.ContactDTO;
import com.outis.crmgp.service.dto.TaskDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Contact} and its DTO {@link ContactDTO}.
 */
@Mapper(componentModel = "spring")
public interface ContactMapper extends EntityMapper<ContactDTO, Contact> {
    @Mapping(target = "tasks", source = "tasks", qualifiedByName = "taskIdSet")
    ContactDTO toDto(Contact s);

    @Mapping(target = "removeTask", ignore = true)
    Contact toEntity(ContactDTO contactDTO);

    @Named("taskId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TaskDTO toDtoTaskId(Task task);

    @Named("taskIdSet")
    default Set<TaskDTO> toDtoTaskIdSet(Set<Task> task) {
        return task.stream().map(this::toDtoTaskId).collect(Collectors.toSet());
    }
}
