import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITask } from 'app/shared/model/task.model';
import { getEntities as getTasks } from 'app/entities/task/task.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { getEntity, updateEntity, createEntity, reset } from './contact.reducer';

export const ContactUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const tasks = useAppSelector(state => state.task.entities);
  const contactEntity = useAppSelector(state => state.contact.entity);
  const loading = useAppSelector(state => state.contact.loading);
  const updating = useAppSelector(state => state.contact.updating);
  const updateSuccess = useAppSelector(state => state.contact.updateSuccess);

  const handleClose = () => {
    navigate('/contact' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getTasks({}));
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

    const entity = {
      ...contactEntity,
      ...values,
      tasks: mapIdList(values.tasks),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...contactEntity,
          tasks: contactEntity?.tasks?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmgpApp.contact.home.createOrEditLabel" data-cy="ContactCreateUpdateHeading">
            <Translate contentKey="crmgpApp.contact.home.createOrEditLabel">Create or edit a Contact</Translate>
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
                  id="contact-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('crmgpApp.contact.firstName')}
                id="contact-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.contact.middleName')}
                id="contact-middleName"
                name="middleName"
                data-cy="middleName"
                type="text"
                validate={{
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.contact.lastName')}
                id="contact-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
                validate={{
                  minLength: { value: 2, message: translate('entity.validation.minlength', { min: 2 }) },
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.contact.email')}
                id="contact-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: translate('entity.validation.pattern', { pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' }),
                  },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.contact.phone')}
                id="contact-phone"
                name="phone"
                data-cy="phone"
                type="text"
                validate={{
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: translate('entity.validation.pattern', { pattern: '^\\+?[1-9]\\d{1,14}$' }),
                  },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.contact.address')}
                id="contact-address"
                name="address"
                data-cy="address"
                type="text"
              />
              <ValidatedField label={translate('crmgpApp.contact.city')} id="contact-city" name="city" data-cy="city" type="text" />
              <ValidatedField label={translate('crmgpApp.contact.state')} id="contact-state" name="state" data-cy="state" type="text" />
              <ValidatedField
                label={translate('crmgpApp.contact.postalCode')}
                id="contact-postalCode"
                name="postalCode"
                data-cy="postalCode"
                type="text"
                validate={{
                  pattern: {
                    value: /^\d{5}(-\d{4})?$/,
                    message: translate('entity.validation.pattern', { pattern: '^\\d{5}(-\\d{4})?$' }),
                  },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.contact.country')}
                id="contact-country"
                name="country"
                data-cy="country"
                type="text"
              />
              <ValidatedField
                label={translate('crmgpApp.contact.socialMediaProfiles')}
                id="contact-socialMediaProfiles"
                name="socialMediaProfiles"
                data-cy="socialMediaProfiles"
                type="text"
              />
              <ValidatedField label={translate('crmgpApp.contact.notes')} id="contact-notes" name="notes" data-cy="notes" type="textarea" />
              <ValidatedField
                label={translate('crmgpApp.contact.task')}
                id="contact-task"
                data-cy="task"
                type="select"
                multiple
                name="tasks"
              >
                <option value="" key="0" />
                {tasks
                  ? tasks.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/contact" replace color="info">
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

export default ContactUpdate;
