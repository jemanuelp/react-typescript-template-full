import {ChangeEvent, Fragment, useState} from 'react';
import {read, utils} from 'xlsx';
// const safa = require('xlsx');
import toast from 'react-hot-toast';
import {useDropzone} from 'react-dropzone';
import {DownloadCloud} from 'react-feather';
import ExtensionsHeader from '../../../@core/components/extensions-header';
import {Row, Col, Card, CardBody, Table, CardHeader, CardTitle, Input, Label} from 'reactstrap';
import '../../../@core/scss/react/libs/file-uploader/file-uploader.scss';

const Import = () => {
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [tableData, setTableData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const getTableData = (arr: any[], name: string) => {
    setTableData(arr);
    setName(name);
  };

  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    onDrop: result => {
      const reader = new FileReader();
      reader.onload = function() {
        const fileData = reader.result;
        const wb = read(fileData, {type: 'binary'});

        wb.SheetNames.forEach(function(sheetName: string) {
          const rowObj = utils.sheet_to_json(wb.Sheets[sheetName]);
          getTableData(rowObj, result[0].name);
        });
      };
      if (result.length && result[0].name.endsWith('xlsx')) {
        reader.readAsBinaryString(result[0]);
      } else {
        toast.error(
          () => (
            <p className='mb-0'>
                            You can only upload <span className='fw-bolder'>.xlsx</span>, <span
                className='fw-bolder'>.xls</span> &{' '}
              <span className='fw-bolder'>.csv</span> Files!.
            </p>
          ),
          {
            style: {
              minWidth: '380px',
            },
          },
        );
      }
    },
  });

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const data = tableData;
    let filteredData = [];
    const value = e.target.value;
    setValue(value);

    if (value.length) {
      filteredData = data.filter(col => {
        const keys = Object.keys(col);

        const startsWithCondition = keys.filter(key => {
          return col[key].toString().toLowerCase().startsWith(value.toLowerCase());
        });

        const includesCondition = keys.filter(
          key => col[key].toString().toLowerCase().includes(value.toLowerCase()),
        );

        if (startsWithCondition.length) {
          return startsWithCondition.map(key => {
            return {...col, [key]: col[key]};
          });
        } else {
          if (!startsWithCondition && includesCondition.length) {
            return includesCondition.map(key => {
              return {...col, [key]: col[key]};
            });
          } else {
            return null;
          }
        }
      });
      setFilteredData(filteredData);
      setValue(value);
    } else {
      return null;
    }
  };

  const headArr = tableData.length ?
    tableData.map((col, index) => {
      if (index === 0) return [...Object.keys(col)];
      else return null;
    }) :
    [];
  const dataArr = value.length ?
    filteredData :
    tableData.length && !value.length ?
      tableData : 
      null;

  const renderTableBody = () => {
    if (dataArr !== null && dataArr.length) {
      return dataArr.map((col, index) => {
        const keys = Object.keys(col);
        const renderTd = keys.map((key, index) => <td key={index}>{col[key]}</td>);
        return <tr key={index}>{renderTd}</tr>;
      });
    } else {
      return null;
    }
  };

  const renderTableHead = () => {
    if (headArr.length && headArr[0] && headArr[0].length) {
      return headArr[0].map((head, index) => {
        return <th key={index}>{head}</th>;
      });
    } else {
      return null;
    }
  };

  return (
    <Fragment>
      <ExtensionsHeader
        title='XLSX'
        subTitle='Xlsx is a parser and writer for various spreadsheet formats'
        link='https://github.com/SheetJS/sheetjs'
      />
      <Row className='import-component'>
        <Col sm='12'>
          <Card>
            <CardBody>
              <Row>
                <Col sm='12'>
                  <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <div className='d-flex align-items-center justify-content-center flex-column'>
                      <DownloadCloud size={64}/>
                      <h5>Drop Files here or click to upload</h5>
                      <p className='text-secondary'>
                                                Drop files here or click{' '}
                        <a href='/' onClick={e => e.preventDefault()}>
                                                    browse
                        </a>{' '}
                                                thorough your machine
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        {tableData.length ?
          (<Col sm='12'>
            <Card>
              <CardHeader className='justify-content-between flex-wrap'>
                <CardTitle tag='h4'>{name}</CardTitle>
                <div className='d-flex align-items-center justify-content-end'>
                  <Label for='search-input' className='me-1'>
                                            Search
                  </Label>
                  <Input id='search-input' type='text' bsSize='sm' value={value}
                    onChange={e => handleFilter(e)}/>
                </div>
              </CardHeader>
              <Table className='table-hover-animation' responsive>
                <thead>
                  <tr>{renderTableHead()}</tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </Table>
            </Card>
          </Col>
          ) :
          null}
      </Row>
    </Fragment>
  );
};

export default Import;
