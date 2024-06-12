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
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { getEntities as getContacts } from 'app/entities/contact/contact.reducer';
import { ITask } from 'app/shared/model/task.model';
import { getEntity, updateEntity, createEntity, reset } from './task.reducer';

export const TaskUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const opportunities = useAppSelector(state => state.opportunity.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const contacts = useAppSelector(state => state.contact.entities);
  const taskEntity = useAppSelector(state => state.task.entity);
  const loading = useAppSelector(state => state.task.loading);
  const updating = useAppSelector(state => state.task.updating);
  const updateSuccess = useAppSelector(state => state.task.updateSuccess);

  const handleClose = () => {
    navigate('/task' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getOpportunities({}));
    dispatch(getUsers({}));
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
    values.assignedAt = convertDateTimeToServer(values.assignedAt);
    values.completedAt = convertDateTimeToServer(values.completedAt);

    const entity = {
      ...taskEntity,
      ...values,
      opportunity: opportunities.find(it => it.id.toString() === values.opportunity?.toString()),
      assignedTo: users.find(it => it.id.toString() === values.assignedTo?.toString()),
      contacts: mapIdList(values.contacts),
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
          assignedAt: displayDefaultDateTime(),
          completedAt: displayDefaultDateTime(),
        }
      : {
          ...taskEntity,
          assignedAt: convertDateTimeFromServer(taskEntity.assignedAt),
          completedAt: convertDateTimeFromServer(taskEntity.completedAt),
          opportunity: taskEntity?.opportunity?.id,
          assignedTo: taskEntity?.assignedTo?.id,
          contacts: taskEntity?.contacts?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crmgpApp.task.home.createOrEditLabel" data-cy="TaskCreateUpdateHeading">
            <Translate contentKey="crmgpApp.task.home.createOrEditLabel">Create or edit a Task</Translate>
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
                  id="task-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('crmgpApp.task.name')}
                id="task-name"
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
                label={translate('crmgpApp.task.dueAt')}
                id="task-dueAt"
                name="dueAt"
                data-cy="dueAt"
                type="date"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('crmgpApp.task.completed')}
                id="task-completed"
                name="completed"
                data-cy="completed"
                check
                type="checkbox"
              />
              <ValidatedField
                label={translate('crmgpApp.task.description')}
                id="task-description"
                name="description"
                data-cy="description"
                type="textarea"
              />
              <ValidatedField
                label={translate('crmgpApp.task.priority')}
                id="task-priority"
                name="priority"
                data-cy="priority"
                type="text"
              />
              <ValidatedField
                label={translate('crmgpApp.task.assignedAt')}
                id="task-assignedAt"
                name="assignedAt"
                data-cy="assignedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('crmgpApp.task.completedAt')}
                id="task-completedAt"
                name="completedAt"
                data-cy="completedAt"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                id="task-opportunity"
                name="opportunity"
                data-cy="opportunity"
                label={translate('crmgpApp.task.opportunity')}
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
                id="task-assignedTo"
                name="assignedTo"
                data-cy="assignedTo"
                label={translate('crmgpApp.task.assignedTo')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('crmgpApp.task.contact')}
                id="task-contact"
                data-cy="contact"
                type="select"
                multiple
                name="contacts"
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/task" replace color="info">
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

export default TaskUpdate;
