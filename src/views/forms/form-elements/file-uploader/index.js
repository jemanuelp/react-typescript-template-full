import { Fragment } from 'react';

import { Row, Col } from 'reactstrap';

import ExtensionsHeader from 'src/@core/components/extensions-header';

import FileUploaderSingle from './FileUploaderSingle';
import FileUploaderMultiple from './FileUploaderMultiple';
import FileUploaderRestrictions from './FileUploaderRestrictions';

import 'src/@core/scss/react/libs/file-uploader/file-uploader.scss';

const Uploader = () => {
  return (
    <Fragment>
      <ExtensionsHeader
        title='React Dropzone'
        link='https://github.com/react-dropzone/react-dropzone'
        subTitle="Simple React hook to create a HTML5-compliant drag'n'drop zone for files."
      />

      <Row>
        <Col sm='12'>
          <FileUploaderMultiple />
        </Col>
        <Col sm='12'>
          <FileUploaderSingle />
        </Col>
        <Col sm='12'>
          <FileUploaderRestrictions />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Uploader;
