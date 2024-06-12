import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './order.reducer';

export const OrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const orderEntity = useAppSelector(state => state.order.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDetailsHeading">
          <Translate contentKey="crmgpApp.order.detail.title">Order</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderEntity.id}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="crmgpApp.order.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{orderEntity.createdAt ? <TextFormat value={orderEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="crmgpApp.order.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{orderEntity.quantity}</dd>
          <dt>
            <span id="unitPrice">
              <Translate contentKey="crmgpApp.order.unitPrice">Unit Price</Translate>
            </span>
          </dt>
          <dd>{orderEntity.unitPrice}</dd>
          <dt>
            <span id="totalPrice">
              <Translate contentKey="crmgpApp.order.totalPrice">Total Price</Translate>
            </span>
          </dt>
          <dd>{orderEntity.totalPrice}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="crmgpApp.order.status">Status</Translate>
            </span>
          </dt>
          <dd>{orderEntity.status}</dd>
          <dt>
            <span id="shippingAt">
              <Translate contentKey="crmgpApp.order.shippingAt">Shipping At</Translate>
            </span>
          </dt>
          <dd>{orderEntity.shippingAt ? <TextFormat value={orderEntity.shippingAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="comments">
              <Translate contentKey="crmgpApp.order.comments">Comments</Translate>
            </span>
          </dt>
          <dd>{orderEntity.comments}</dd>
          <dt>
            <Translate contentKey="crmgpApp.order.opportunity">Opportunity</Translate>
          </dt>
          <dd>{orderEntity.opportunity ? orderEntity.opportunity.id : ''}</dd>
          <dt>
            <Translate contentKey="crmgpApp.order.product">Product</Translate>
          </dt>
          <dd>{orderEntity.product ? orderEntity.product.id : ''}</dd>
          <dt>
            <Translate contentKey="crmgpApp.order.quotation">Quotation</Translate>
          </dt>
          <dd>{orderEntity.quotation ? orderEntity.quotation.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDetail;
