package com.otus.crmgp.service.mapper;

import com.otus.crmgp.domain.Opportunity;
import com.otus.crmgp.domain.Product;
import com.otus.crmgp.domain.Quotation;
import com.otus.crmgp.service.dto.OpportunityDTO;
import com.otus.crmgp.service.dto.ProductDTO;
import com.otus.crmgp.service.dto.QuotationDTO;
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
