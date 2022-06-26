import { Fragment } from 'react';
import PaymentMethods from './PaymentMethods';
import BillingAddress from './BillingAddress';
import BillingCurrentPlan from './BillingCurrentPlan';

const BillingTab = () => {
  return (
    <Fragment>
      <BillingCurrentPlan />
      <PaymentMethods />
      <BillingAddress />
    </Fragment>
  );
};

export default BillingTab;
