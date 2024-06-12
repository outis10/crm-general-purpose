import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './invoice.reducer';

export const InvoiceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const invoiceEntity = useAppSelector(state => state.invoice.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="invoiceDetailsHeading">
          <Translate contentKey="crmgpApp.invoice.detail.title">Invoice</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.id}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="crmgpApp.invoice.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.createdAt ? <TextFormat value={invoiceEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="dueAt">
              <Translate contentKey="crmgpApp.invoice.dueAt">Due At</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.dueAt ? <TextFormat value={invoiceEntity.dueAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="crmgpApp.invoice.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.amount}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="crmgpApp.invoice.status">Status</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.status}</dd>
          <dt>
            <span id="comments">
              <Translate contentKey="crmgpApp.invoice.comments">Comments</Translate>
            </span>
          </dt>
          <dd>{invoiceEntity.comments}</dd>
          <dt>
            <Translate contentKey="crmgpApp.invoice.order">Order</Translate>
          </dt>
          <dd>{invoiceEntity.order ? invoiceEntity.order.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/invoice" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice/${invoiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default InvoiceDetail;
