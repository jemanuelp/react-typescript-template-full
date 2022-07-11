import { Search } from 'react-feather';
import { Card, CardBody, CardText, Form, Input, InputGroup, InputGroupText } from 'reactstrap';
import {ChangeEvent} from 'react';

const FaqFilter = ({ searchTerm, setSearchTerm, getFAQData }: any) => {
  const handleFaqFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    getFAQData(e.target.value);
  };

  return (
    <div id='faq-search-filter'>
      <Card
        className='faq-search'
        style={{
          backgroundImage: `url(${require('src/assets/images/banner/banner.png')})`,
        }}
      >
        <CardBody className='text-center'>
          <h2 className='text-primary'>Let's answer some questions</h2>
          <CardText className='mb-2'>or choose a category to quickly find the help you need</CardText>
          <Form className='faq-search-input' onSubmit={e => e.preventDefault()}>
            <InputGroup className='input-group-merge'>
              <InputGroupText>
                <Search size={14} />
              </InputGroupText>
              <Input value={searchTerm} onChange={e => handleFaqFilter(e)} placeholder='search faq...' />
            </InputGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default FaqFilter;
