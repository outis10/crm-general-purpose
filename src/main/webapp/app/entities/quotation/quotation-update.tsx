import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IOpportunity } from 'app/shared/model/opportunity.model';
import { getEntities as getOpportunities } from 'app/entities/opportunity/opportunity.reducer';
import { IProduct } from 'app/shared/model/product.model';
import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { IQuotation } from 'app/shared/model/quotation.model';
import { QuotationStatus } from 'app/shared/model/enumerations/quotation-status.model';
import { getEntity, updateEntity, createEntity, reset } from './quotation.reducer';

export const QuotationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const opportunities = useAppSelector(state => state.opportunity.entities);
  const products = useAppSelector(state => state.product.entities);
  const quotationEntity = useAppSelector(state => state.quotation.entity);
  const loading = useAppSelector(state => state.quotation.loading);
  const updating = useAppSelector(state => state.quotation.updating);
  const updateSuccess = useAppSelector(state => state.quotation.updateSuccess);
  const quotationStatusValues = Object.keys(QuotationStatus);

  const handleClose = () => {
    navigate('/quotation' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getOpportunities({}));
    dispatch(getProducts({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    values.createdAt = convertDateTimeToServer(values.createdAt);
    if (values.quantity !== undefined && typeof values.quantity !== 'number') {
      values.quantity = Number(values.quantity);
    }
    if (values.unitPrice !== undefined && typeof values.unitPrice !== 'number') {
      values.unitPrice = Number(values.unitPrice);
    }
    if (values.totalPrice !== undefined && typeof values.totalPrice !== 'number') {
      values.totalPrice = Number(values.totalPrice);
    }
    values.expiredAt = convertDateTimeToServer(values.expiredAt);

    const entity = {
      ...quotationEntity,
      ...values,
      opportunity: opportunities.find(it => it.id.toString() === values.opportunity?.toString()),
      product: products.find(it => it.id.toString() === values.product?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          createdAt: displayDefaultDateTime(),
          expiredAt: displayDefaultDateTime(),
        }
      : {
          status: 'DRAFT',
          ...quotationEntity,
          createdAt: convertDateTimeFromServer(quotationEntity.createdAt),
          expiredAt: convertDateTimeFromServer(quotationEntity.expiredAt),
          opportunity: quotationEntity?.opportunity?.id,
          product: quotationEntity?.product?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmgpApp.quotation.home.createOrEditLabel" data-cy="QuotationCreateUpdateHeading">
            <Translate contentKey="crmgpApp.quotation.home.createOrEditLabel">Create or edit a Quotation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="quotation-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('crmgpApp.quotation.createdAt')}
                id="quotation-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.quotation.quantity')}
                id="quotation-quantity"
                name="quantity"
                data-cy="quantity"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 1, message: translate('entity.validation.min', { min: 1 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.quotation.unitPrice')}
                id="quotation-unitPrice"
                name="unitPrice"
                data-cy="unitPrice"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.quotation.totalPrice')}
                id="quotation-totalPrice"
                name="totalPrice"
                data-cy="totalPrice"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.quotation.status')}
                id="quotation-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {quotationStatusValues.map(quotationStatus => (
                  <option value={quotationStatus} key={quotationStatus}>
                    {translate('crmgpApp.QuotationStatus.' + quotationStatus)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('crmgpApp.quotation.expiredAt')}
                id="quotation-expiredAt"
                name="expiredAt"
                data-cy="expiredAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.quotation.comments')}
                id="quotation-comments"
                name="comments"
                data-cy="comments"
                type="text"
              />
              <ValidatedField
                id="quotation-opportunity"
                name="opportunity"
                data-cy="opportunity"
                label={translate('crmgpApp.quotation.opportunity')}
                type="select"
              >
                <option value="" key="0" />
                {opportunities
                  ? opportunities.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="quotation-product"
                name="product"
                data-cy="product"
                label={translate('crmgpApp.quotation.product')}
                type="select"
              >
                <option value="" key="0" />
                {products
                  ? products.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/quotation" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default QuotationUpdate;
