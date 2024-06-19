package com.outis.crmgp.service.mapper;

import com.outis.crmgp.domain.Opportunity;
import com.outis.crmgp.domain.Product;
import com.outis.crmgp.domain.Quotation;
import com.outis.crmgp.service.dto.OpportunityDTO;
import com.outis.crmgp.service.dto.ProductDTO;
import com.outis.crmgp.service.dto.QuotationDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Quotation} and its DTO {@link QuotationDTO}.
 */
@Mapper(componentModel = "spring")
public interface QuotationMapper extends EntityMapper<QuotationDTO, Quotation> {
    @Mapping(target = "opportunity", source = "opportunity", qualifiedByName = "opportunityId")
    @Mapping(target = "product", source = "product", qualifiedByName = "productId")
    QuotationDTO toDto(Quotation s);

    @Named("opportunityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OpportunityDTO toDtoOpportunityId(Opportunity opportunity);

    @Named("productId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProductDTO toDtoProductId(Product product);
}
