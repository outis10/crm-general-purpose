package com.outis.crmgp.service.mapper;

import com.outis.crmgp.domain.Notification;
import com.outis.crmgp.domain.User;
import com.outis.crmgp.service.dto.NotificationDTO;
import com.outis.crmgp.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Notification} and its DTO {@link NotificationDTO}.
 */
@Mapper(componentModel = "spring")
public interface NotificationMapper extends EntityMapper<NotificationDTO, Notification> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    NotificationDTO toDto(Notification s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
