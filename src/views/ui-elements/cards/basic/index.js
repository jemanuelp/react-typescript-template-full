import { Fragment } from 'react';

import CardTitles from './CardTitles';
import CardImages from './CardImages';
import CardLayout from './CardLayout';
import CardNavigation from './CardNavigation';
import CardHeaderFooter from './CardHeaderFooter';
import CardContentTypes from './CardContentTypes';
import CardTextAlignment from './CardTextAlignment';
import CardStyleVariation from './CardStyleVariation';

import Breadcrumbs from 'src/@core/components/breadcrumbs';

const BasicCards = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Basic Cards' data={[{ title: 'Cards' }, { title: 'Basic Cards' }]} />
      <CardTitles />
      <CardContentTypes />
      <CardHeaderFooter />
      <CardTextAlignment />
      <CardNavigation />
      <CardImages />
      <CardStyleVariation />
      <CardLayout />
    </Fragment>
  );
};

export default BasicCards;
