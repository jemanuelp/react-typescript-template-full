import Avatar from '../../avatar';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';
import {areaChartOptions, ChartTypes} from './ChartOptions';
import {ReactElement, ReactNode} from 'react';
import {ColorTypesWithoutLight} from '../../../../views/ui-elements/cards/models/ColorTypes';
import {ApexOptions} from 'apexcharts';
import {ISerie} from '../../../../views/ui-elements/cards/statistics/interfaces/ISerie';

export type StatsWithAreaChartProps = {
  icon: ReactElement;
  color: ColorTypesWithoutLight;
  stats: ReactNode;
  statTitle: string;
  options: ApexOptions;
  series: ISerie[];
  type: ChartTypes;
  height?: number;
  className?: string;
}

const StatsWithAreaChart = (props: StatsWithAreaChartProps) => {
  const {
    icon,
    color,
    stats,
    statTitle,
    series,
    options,
    type,
    height,
    className,
    ...rest
  } = props;
  const classNameCardBody = className ?
    classnames('pb-0', {
      [className]: className,
    }) :
    '';
  return (
    <Card {...rest}>
      <CardBody
        className={classNameCardBody}
      >
        <Avatar className='avatar-stats p-50 m-0' color={`light-${color}`} icon={icon} />
        <h2 className='fw-bolder mt-1'>{stats}</h2>
        <p className='card-text'>{statTitle}</p>
      </CardBody>
      <Chart
        options={options}
        series={series}
        type={type}
        height={
          height ?
            height :
            100
        }
      />
    </Card>
  );
};

export default StatsWithAreaChart;

StatsWithAreaChart.propTypes = {
  type: PropTypes.string,
  height: PropTypes.string,
  options: PropTypes.object,
  className: PropTypes.string,
  icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  stats: PropTypes.string.isRequired,
  series: PropTypes.array.isRequired,
  statTitle: PropTypes.string.isRequired,
};

// ** Default Props
StatsWithAreaChart.defaultProps = {
  color: 'primary',
  options: areaChartOptions,
};
