import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { OpportunityStage } from 'app/shared/model/enumerations/opportunity-stage.model';
import { getEntity, updateEntity, createEntity, reset } from './opportunity.reducer';

export const OpportunityUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const contacts = useAppSelector(state => state.contact.entities);
  const opportunityEntity = useAppSelector(state => state.opportunity.entity);
  const loading = useAppSelector(state => state.opportunity.loading);
  const updating = useAppSelector(state => state.opportunity.updating);
  const updateSuccess = useAppSelector(state => state.opportunity.updateSuccess);
  const opportunityStageValues = Object.keys(OpportunityStage);

  const handleClose = () => {
    navigate('/opportunity' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getContacts({}));
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
    if (values.amount !== undefined && typeof values.amount !== 'number') {
      values.amount = Number(values.amount);
    }
    if (values.probability !== undefined && typeof values.probability !== 'number') {
      values.probability = Number(values.probability);
    }
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.modifiedAt = convertDateTimeToServer(values.modifiedAt);
    values.closedAt = convertDateTimeToServer(values.closedAt);

    const entity = {
      ...opportunityEntity,
      ...values,
      contact: contacts.find(it => it.id.toString() === values.contact?.toString()),
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
          modifiedAt: displayDefaultDateTime(),
          closedAt: displayDefaultDateTime(),
        }
      : {
          stage: 'PROSPECTING',
          ...opportunityEntity,
          createdAt: convertDateTimeFromServer(opportunityEntity.createdAt),
          modifiedAt: convertDateTimeFromServer(opportunityEntity.modifiedAt),
          closedAt: convertDateTimeFromServer(opportunityEntity.closedAt),
          contact: opportunityEntity?.contact?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmgpApp.opportunity.home.createOrEditLabel" data-cy="OpportunityCreateUpdateHeading">
            <Translate contentKey="crmgpApp.opportunity.home.createOrEditLabel">Create or edit a Opportunity</Translate>
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
                  id="opportunity-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('crmgpApp.opportunity.name')}
                id="opportunity-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.opportunity.amount')}
                id="opportunity-amount"
                name="amount"
                data-cy="amount"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.opportunity.probability')}
                id="opportunity-probability"
                name="probability"
                data-cy="probability"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  max: { value: 100, message: translate('entity.validation.max', { max: 100 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.opportunity.expectedCloseDate')}
                id="opportunity-expectedCloseDate"
                name="expectedCloseDate"
                data-cy="expectedCloseDate"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.opportunity.stage')}
                id="opportunity-stage"
                name="stage"
                data-cy="stage"
                type="select"
              >
                {opportunityStageValues.map(opportunityStage => (
                  <option value={opportunityStage} key={opportunityStage}>
                    {translate('crmgpApp.OpportunityStage.' + opportunityStage)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('crmgpApp.opportunity.description')}
                id="opportunity-description"
                name="description"
                data-cy="description"
                type="textarea"
              />
              <ValidatedField
                label={translate('crmgpApp.opportunity.createdAt')}
                id="opportunity-createdAt"
                name="createdAt"
                data-cy="createdAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.opportunity.modifiedAt')}
                id="opportunity-modifiedAt"
                name="modifiedAt"
                data-cy="modifiedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('crmgpApp.opportunity.closedAt')}
                id="opportunity-closedAt"
                name="closedAt"
                data-cy="closedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="opportunity-contact"
                name="contact"
                data-cy="contact"
                label={translate('crmgpApp.opportunity.contact')}
                type="select"
              >
                <option value="" key="0" />
                {contacts
                  ? contacts.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/opportunity" replace color="info">
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

export default OpportunityUpdate;
