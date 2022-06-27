import Proptypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const ExtensionsHeader = (props: any) => {
  return (
    <Row className='mb-2'>
      <Col sm='12' className='ms-50'>
        <p className='font-medium-5 mt-1 extension-title' data-tour='extension-title'>
          {props.title}
        </p>
        {props.link ?
          (
            <a href={props.link} target='_blank' rel='noopener noreferrer'>
              {props.subTitle}
            </a>
          ) :
          (
            <p className='text-primary'>{props.subTitle}</p>
          )}
      </Col>
    </Row>
  );
};
export default ExtensionsHeader;

ExtensionsHeader.propTypes = {
  link: Proptypes.string,
  title: Proptypes.string.isRequired,
  subTitle: Proptypes.string.isRequired,
};
