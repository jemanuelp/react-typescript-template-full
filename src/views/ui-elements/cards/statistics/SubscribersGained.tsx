import {useEffect, useState} from 'react';
import axios from 'axios';
import {Users} from 'react-feather';
import StatsWithAreaChart from '../../../../@core/components/widgets/stats/StatsWithAreaChart';
import {ISubscribersGained} from '../../../../domains/interfaces/card-statistics/ISubscribersGained';

const SubscribersGained = ({kFormatter}: { kFormatter: Function }) => {
  const [data, setData] = useState<ISubscribersGained | null>(null);

  useEffect(() => {
    axios.get('/card/card-statistics/subscribers').then(res => setData(res.data));
    return () => setData(null);
  }, []);

  return data !== null
    ? (
      <StatsWithAreaChart
        icon={<Users size={21}/>}
        color='primary'
        stats={kFormatter(data.analyticsData.subscribers)}
        statTitle='Subscribers Gained'
        series={data.series}
        type='area'
      />
    )
    : null;
};

export default SubscribersGained;
