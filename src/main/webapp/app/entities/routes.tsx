import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Contact from './contact';
import Opportunity from './opportunity';
import Task from './task';
import Product from './product';
import Notification from './notification';
import Quotation from './quotation';
import Order from './order';
import Invoice from './invoice';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="contact/*" element={<Contact />} />
        <Route path="opportunity/*" element={<Opportunity />} />
        <Route path="task/*" element={<Task />} />
        <Route path="product/*" element={<Product />} />
        <Route path="notification/*" element={<Notification />} />
        <Route path="quotation/*" element={<Quotation />} />
        <Route path="order/*" element={<Order />} />
        <Route path="invoice/*" element={<Invoice />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
