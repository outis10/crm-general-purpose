package com.outis.crmgp.repository;

import com.outis.crmgp.domain.Notification;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Notification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query("select notification from Notification notification where notification.user.login = ?#{authentication.name}")
    List<Notification> findByUserIsCurrentUser();
}
