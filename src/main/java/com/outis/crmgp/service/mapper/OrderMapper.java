package com.outis.crmgp.service.mapper;

import com.outis.crmgp.domain.Opportunity;
import com.outis.crmgp.domain.Order;
import com.outis.crmgp.domain.Product;
import com.outis.crmgp.domain.Quotation;
import com.outis.crmgp.service.dto.OpportunityDTO;
import com.outis.crmgp.service.dto.OrderDTO;
import com.outis.crmgp.service.dto.ProductDTO;
import com.outis.crmgp.service.dto.QuotationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Order} and its DTO {@link OrderDTO}.
 */
@Mapper(componentModel = "spring")
public interface OrderMapper extends EntityMapper<OrderDTO, Order> {
    @Mapping(target = "opportunity", source = "opportunity", qualifiedByName = "opportunityId")
    @Mapping(target = "product", source = "product", qualifiedByName = "productId")
    @Mapping(target = "quotation", source = "quotation", qualifiedByName = "quotationId")
    OrderDTO toDto(Order s);

    @Named("opportunityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OpportunityDTO toDtoOpportunityId(Opportunity opportunity);

    @Named("productId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProductDTO toDtoProductId(Product product);

    @Named("quotationId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuotationDTO toDtoQuotationId(Quotation quotation);
}
