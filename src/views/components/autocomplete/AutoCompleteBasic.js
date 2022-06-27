import { useState } from 'react';

import AutoComplete from 'src/@core/components/autocomplete';

const AutoCompleteBasic = () => {
  const [suggestions] = useState([
    {
      title: 'React.js'
    },
    {
      title: 'Angular.js'
    },
    {
      title: 'Javascript'
    },
    {
      title: 'Vue.js'
    },
    {
      title: 'HTML'
    },
    {
      title: 'CSS'
    },
    {
      title: 'SCSS'
    },
    {
      title: 'PHP'
    },
    {
      title: 'Laravel'
    }
  ]);

  return (
    <AutoComplete
      filterKey='title'
      suggestionLimit={4}
      placeholder="Type 'a'"
      suggestions={suggestions}
      className='form-control'
    />
  );
};
export default AutoCompleteBasic;
