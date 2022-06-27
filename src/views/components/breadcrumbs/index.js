import { Fragment, useEffect } from 'react';

import Prism from 'prismjs';

import BreadCrumbStyles from './BreadcrumbStyles';
import BreadcrumbsDefault from './BreadcrumbsDefault';
import BreadCrumbsPage from 'src/@core/components/breadcrumbs';
import BreadCrumbAlignment from './BreadcrumbAlignment';

import Card from 'src/@core/components/card-snippet';

import { Row, Col, CardText } from 'reactstrap';

// ** Source Code
import { breadcrumbsAlignment, breadcrumbsDefault, breadcrumbsStyles } from './BreadCrumbsSourceCode';

const BreadCrumbs = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Fragment>
      <BreadCrumbsPage title='Breadcrumbs' data={[{ title: 'Components' }, { title: 'Breadcrumbs' }]} />

      <Row>
        <Col sm='12'>
          <section id='component-breadcrumbs'>
            <Card title='Default' code={breadcrumbsDefault}>
              <BreadcrumbsDefault />
            </Card>
            <Card title='Styles' code={breadcrumbsStyles}>
              <CardText>
                These breadcrumbs are only for demo puropses. You can change breadcrumb seprator by changing{' '}
                <code>$breadcrumb-divider</code> variable value in scss
              </CardText>
              <BreadCrumbStyles />
            </Card>
          </section>
        </Col>
        <Col sm='12'>
          <section id='breadcrumb-alignment'>
            <Card title='Alignment' code={breadcrumbsAlignment}>
              <CardText>
                Use class <code>.justify-content-{'{position}'}</code> to align breadcrumb to desired position.
              </CardText>
              <BreadCrumbAlignment />
            </Card>
          </section>
        </Col>
      </Row>
    </Fragment>
  );
};
export default BreadCrumbs;
