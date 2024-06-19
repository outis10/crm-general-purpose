import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './opportunity.reducer';

export const OpportunityDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const opportunityEntity = useAppSelector(state => state.opportunity.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="opportunityDetailsHeading">
          <Translate contentKey="crmgpApp.opportunity.detail.title">Opportunity</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="crmgpApp.opportunity.name">Name</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.name}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="crmgpApp.opportunity.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.amount}</dd>
          <dt>
            <span id="probability">
              <Translate contentKey="crmgpApp.opportunity.probability">Probability</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.probability}</dd>
          <dt>
            <span id="expectedCloseDate">
              <Translate contentKey="crmgpApp.opportunity.expectedCloseDate">Expected Close Date</Translate>
            </span>
          </dt>
          <dd>
            {opportunityEntity.expectedCloseDate ? (
              <TextFormat value={opportunityEntity.expectedCloseDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="stage">
              <Translate contentKey="crmgpApp.opportunity.stage">Stage</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.stage}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="crmgpApp.opportunity.description">Description</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.description}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="crmgpApp.opportunity.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {opportunityEntity.createdAt ? <TextFormat value={opportunityEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="modifiedAt">
              <Translate contentKey="crmgpApp.opportunity.modifiedAt">Modified At</Translate>
            </span>
          </dt>
          <dd>
            {opportunityEntity.modifiedAt ? <TextFormat value={opportunityEntity.modifiedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="closedAt">
              <Translate contentKey="crmgpApp.opportunity.closedAt">Closed At</Translate>
            </span>
          </dt>
          <dd>
            {opportunityEntity.closedAt ? <TextFormat value={opportunityEntity.closedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="crmgpApp.opportunity.contact">Contact</Translate>
          </dt>
          <dd>{opportunityEntity.contact ? opportunityEntity.contact.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/opportunity" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/opportunity/${opportunityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OpportunityDetail;
