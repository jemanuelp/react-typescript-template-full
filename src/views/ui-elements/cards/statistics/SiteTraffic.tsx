import {useEffect, useState} from 'react';
import axios from 'axios';
import {Monitor} from 'react-feather';
import StatsWithLineChart from '../../../../@core/components/widgets/stats/StatsWithLineChart';
import {ISiteTraffic} from '../../../../domains/interfaces/card-statistics/ISiteTraffic';

const SiteTraffic = () => {
  const [data, setData] = useState<ISiteTraffic | null>(null);

  useEffect(() => {
    axios.get('/card/card-statistics/site-traffic').then(res => setData(res.data));
  }, []);

  return data !== null
    ? (
      <StatsWithLineChart
        icon={<Monitor size={21}/>}
        color='primary'
        stats='78.9k'
        statTitle='Site Traffic'
        series={data.series}
        type='line'
      />
    )
    : null;
};

export default SiteTraffic;
