import { Fragment, useEffect } from 'react';

import Prism from 'prismjs';

import { Row, Col } from 'reactstrap';

import Card from 'src/@core/components/card-snippet';
import BreadCrumbs from 'src/@core/components/breadcrumbs';

import AutoCompleteAjax from './AutoCompleteAjax';
import AutoCompleteBasic from './AutoCompleteBasic';
import AutoCompleteRender from './AutoCompleteRender';
import AutoCompleteSections from './AutoCompleteSections';
import AutoCompleteSearchLimit from './AutoCompleteLimit';
import AutoCompleteSuggestions from './AutoCompleteSuggestions';

// ** Source Code
import {
  ajaxExample,
  basicExample,
  sectionExample,
  searchLimitExample,
  customRenderExample,
  defaultSuggestionsExample,
} from './AutoCompleteSourceCode';

const AutoComplete = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <Fragment>
      <BreadCrumbs title='Auto Complete' data={[{ title: 'Components' }, { title: 'Auto Complete' }]} />
      <Row>
        <Col xl='6' lg='12'>
          <Card title='Basic' code={basicExample}>
            <AutoCompleteBasic />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='Sections' code={sectionExample}>
            <AutoCompleteSections />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='Ajax' code={ajaxExample}>
            <AutoCompleteAjax />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='Custom Render' code={customRenderExample}>
            <AutoCompleteRender />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='Default Suggestions' code={defaultSuggestionsExample}>
            <AutoCompleteSuggestions />
          </Card>
        </Col>
        <Col xl='6' lg='12'>
          <Card title='Search Limit' code={searchLimitExample}>
            <AutoCompleteSearchLimit />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default AutoComplete;
