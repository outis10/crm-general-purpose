import contact from 'app/entities/contact/contact.reducer';
import opportunity from 'app/entities/opportunity/opportunity.reducer';
import task from 'app/entities/task/task.reducer';
import product from 'app/entities/product/product.reducer';
import notification from 'app/entities/notification/notification.reducer';
import quotation from 'app/entities/quotation/quotation.reducer';
import order from 'app/entities/order/order.reducer';
import invoice from 'app/entities/invoice/invoice.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  contact,
  opportunity,
  task,
  product,
  notification,
  quotation,
  order,
  invoice,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
