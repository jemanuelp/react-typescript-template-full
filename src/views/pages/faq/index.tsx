import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Faqs from './Faqs';
import FaqFilter from './FaqFilter';
import FaqContact from './FaqContact';
import '../../../@core/scss/base/pages/page-faq.scss';
import Breadcrumbs from '../../../@core/components/breadcrumbs';

const Faq = () => {
  const [data, setData] = useState(null),
    [searchTerm, setSearchTerm] = useState('');

  const getFAQData = (query: any) => {
    return axios.get('/faq/data', { params: { q: query } }).then(response => {
      setData(response.data);
    });
  };

  useEffect(() => {
    getFAQData(searchTerm);
  }, []);

  return (
    <Fragment>
      <Breadcrumbs title='FAQ' data={[{ title: 'Pages' }, { title: 'FAQ' }]} />
      <FaqFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        getFAQData={getFAQData}
      />
      {
        data !== null ?
          <Faqs
            data={data}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          /> :
          null
      }
      <FaqContact />
    </Fragment>
  );
};

export default Faq;
