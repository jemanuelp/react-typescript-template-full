import { Fragment, useEffect } from 'react';

import { Row, Col, CardText } from 'reactstrap';

import Prism from 'prismjs';

import Card from 'src/@core/components/card-snippet';
import BreadCrumbs from 'src/@core/components/breadcrumbs';

import ProgressBasic from './ProgressBasic';
import ProgressColored from './ProgressColored';
import ProgressLabeled from './ProgressLabeled';
import ProgressStriped from './ProgressStriped';
import ProgressAnimated from './ProgressAnimated';
import ProgressMultipleStacked from './ProgressMultipleStacked';

// ** Source Code
import {
  progressBasic,
  progressColored,
  progressLabeled,
  progressStriped,
  progressAnimated,
  progressMultipleStacked,
} from './ProgressSourceCode';

const Progress = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <Fragment>
      <BreadCrumbs title='Progress' data={[{ title: 'Components' }, { title: 'Progress' }]} />
      <Row>
        <Col lg='12'>
          <Card title='Basic Progress' code={progressBasic}>
            <ProgressBasic />
          </Card>
        </Col>
        <Col lg='12'>
          <Card title='Colored Progress' code={progressColored}>
            <CardText>
              Use <code>progress-bar-[color]</code> class with progress to change progress color.
            </CardText>
            <ProgressColored />
          </Card>
        </Col>
        <Col lg='12'>
          <Card title='Labeled Progress' code={progressLabeled}>
            <CardText>Add text between progress tag to create a labeled progress bar.</CardText>
            <ProgressLabeled />
          </Card>
        </Col>
        <Col lg='12'>
          <Card title='Multiple Stacked' code={progressMultipleStacked}>
            <CardText>
              To create a multi colored progress wrap all of your progresses in with <code>multi</code> prop.
            </CardText>
            <ProgressMultipleStacked />
          </Card>
        </Col>
        <Col lg='12'>
          <Card title='Striped Progress' code={progressStriped}>
            <CardText>
              Use <code>striped</code> prop with progress to create a striped progress bar.
            </CardText>
            <ProgressStriped />
          </Card>
        </Col>
        <Col lg='12'>
          <Card title='Animated Progress' code={progressAnimated}>
            <CardText>
              Use <code>animated</code> prop with progress to animate progress bar.
            </CardText>
            <ProgressAnimated />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Progress;
