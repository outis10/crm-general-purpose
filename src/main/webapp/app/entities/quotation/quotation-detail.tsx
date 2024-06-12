import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './quotation.reducer';

export const QuotationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const quotationEntity = useAppSelector(state => state.quotation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="quotationDetailsHeading">
          <Translate contentKey="crmgpApp.quotation.detail.title">Quotation</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{quotationEntity.id}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="crmgpApp.quotation.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {quotationEntity.createdAt ? <TextFormat value={quotationEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="crmgpApp.quotation.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{quotationEntity.quantity}</dd>
          <dt>
            <span id="unitPrice">
              <Translate contentKey="crmgpApp.quotation.unitPrice">Unit Price</Translate>
            </span>
          </dt>
          <dd>{quotationEntity.unitPrice}</dd>
          <dt>
            <span id="totalPrice">
              <Translate contentKey="crmgpApp.quotation.totalPrice">Total Price</Translate>
            </span>
          </dt>
          <dd>{quotationEntity.totalPrice}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="crmgpApp.quotation.status">Status</Translate>
            </span>
          </dt>
          <dd>{quotationEntity.status}</dd>
          <dt>
            <span id="expiredAt">
              <Translate contentKey="crmgpApp.quotation.expiredAt">Expired At</Translate>
            </span>
          </dt>
          <dd>
            {quotationEntity.expiredAt ? <TextFormat value={quotationEntity.expiredAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="comments">
              <Translate contentKey="crmgpApp.quotation.comments">Comments</Translate>
            </span>
          </dt>
          <dd>{quotationEntity.comments}</dd>
          <dt>
            <Translate contentKey="crmgpApp.quotation.opportunity">Opportunity</Translate>
          </dt>
          <dd>{quotationEntity.opportunity ? quotationEntity.opportunity.id : ''}</dd>
          <dt>
            <Translate contentKey="crmgpApp.quotation.product">Product</Translate>
          </dt>
          <dd>{quotationEntity.product ? quotationEntity.product.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/quotation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/quotation/${quotationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default QuotationDetail;
