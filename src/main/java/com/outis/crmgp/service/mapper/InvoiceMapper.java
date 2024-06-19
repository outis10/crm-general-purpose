package com.outis.crmgp.service.mapper;

import com.outis.crmgp.domain.Invoice;
import com.outis.crmgp.domain.Order;
import com.outis.crmgp.service.dto.InvoiceDTO;
import com.outis.crmgp.service.dto.OrderDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Invoice} and its DTO {@link InvoiceDTO}.
 */
@Mapper(componentModel = "spring")
public interface InvoiceMapper extends EntityMapper<InvoiceDTO, Invoice> {
    @Mapping(target = "order", source = "order", qualifiedByName = "orderId")
    InvoiceDTO toDto(Invoice s);

    @Named("orderId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OrderDTO toDtoOrderId(Order order);
}
