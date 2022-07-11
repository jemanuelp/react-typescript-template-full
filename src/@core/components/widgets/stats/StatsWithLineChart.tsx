import Avatar from '../../avatar';
import Chart from 'react-apexcharts';
import { Card, CardHeader, CardText } from 'reactstrap';
import {ChartTypes, lineChartOptions} from './ChartOptions';
import {ReactElement} from 'react';
import {ColorTypesWithoutLight} from '../../../../views/ui-elements/cards/models/ColorTypes';
import {ISerie} from '../../../../views/ui-elements/cards/statistics/interfaces/ISerie';
import {ApexOptions} from 'apexcharts';

export type StatsWithLineChart = {
  icon: ReactElement;
  color: ColorTypesWithoutLight;
  stats: string;
  statTitle: string;
  series: ISerie[];
  options?: ApexOptions;
  type: ChartTypes;
  height?: number;
}

const StatsWithLineChart = ({
  icon,
  color = 'primary',
  stats,
  statTitle,
  series,
  options = lineChartOptions,
  type,
  height,
  ...rest
}: StatsWithLineChart) => {
  return (
    <Card {...rest}>
      <CardHeader className='align-items-start pb-0'>
        <div>
          <h2 className='fw-bolder'>{stats}</h2>
          <CardText>{statTitle}</CardText>
        </div>
        <Avatar className='avatar-stats p-50 m-0' color={`light-${color}`} icon={icon} />
      </CardHeader>
      <Chart
        options={options}
        series={series}
        type={type}
        height={
          height ?
            height :
            100
        } />
    </Card>
  );
};

export default StatsWithLineChart;
