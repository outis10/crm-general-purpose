import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './task.reducer';

export const TaskDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const taskEntity = useAppSelector(state => state.task.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="taskDetailsHeading">
          <Translate contentKey="crmgpApp.task.detail.title">Task</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{taskEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="crmgpApp.task.name">Name</Translate>
            </span>
          </dt>
          <dd>{taskEntity.name}</dd>
          <dt>
            <span id="dueAt">
              <Translate contentKey="crmgpApp.task.dueAt">Due At</Translate>
            </span>
          </dt>
          <dd>{taskEntity.dueAt ? <TextFormat value={taskEntity.dueAt} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="completed">
              <Translate contentKey="crmgpApp.task.completed">Completed</Translate>
            </span>
          </dt>
          <dd>{taskEntity.completed ? 'true' : 'false'}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="crmgpApp.task.description">Description</Translate>
            </span>
          </dt>
          <dd>{taskEntity.description}</dd>
          <dt>
            <span id="priority">
              <Translate contentKey="crmgpApp.task.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{taskEntity.priority}</dd>
          <dt>
            <span id="assignedAt">
              <Translate contentKey="crmgpApp.task.assignedAt">Assigned At</Translate>
            </span>
          </dt>
          <dd>{taskEntity.assignedAt ? <TextFormat value={taskEntity.assignedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="completedAt">
              <Translate contentKey="crmgpApp.task.completedAt">Completed At</Translate>
            </span>
          </dt>
          <dd>{taskEntity.completedAt ? <TextFormat value={taskEntity.completedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="crmgpApp.task.opportunity">Opportunity</Translate>
          </dt>
          <dd>{taskEntity.opportunity ? taskEntity.opportunity.id : ''}</dd>
          <dt>
            <Translate contentKey="crmgpApp.task.assignedTo">Assigned To</Translate>
          </dt>
          <dd>{taskEntity.assignedTo ? taskEntity.assignedTo.id : ''}</dd>
          <dt>
            <Translate contentKey="crmgpApp.task.contact">Contact</Translate>
          </dt>
          <dd>
            {taskEntity.contacts
              ? taskEntity.contacts.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {taskEntity.contacts && i === taskEntity.contacts.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/task" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/task/${taskEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TaskDetail;
