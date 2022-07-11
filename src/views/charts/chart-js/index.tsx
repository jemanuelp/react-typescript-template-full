import { Fragment, useContext } from 'react';
import Breadcrumbs from '../../../@core/components/breadcrumbs';
import { Row, Col } from 'reactstrap';
import BarChart from './ChartjsBarChart';
import LineChart from './ChartjsLineChart';
import AreaChart from './ChartjsAreaChart';
import RadarChart from './ChartjsRadarChart';
import BubbleChart from './ChartjsBubbleChart';
import ScatterChart from './ChartjsScatterChart';
import DoughnutChart from './ChartjsDoughnutChart';
import PolarAreaChart from './ChartjsPolarAreaChart';
import HorizontalBarChart from './ChartjsHorizontalBar';
import { ThemeColors } from '../../../utility/context/ThemeColors';
import 'chart.js/auto';
import '../../../@core/scss/react/libs/flatpickr/flatpickr.scss';
import {useSkin} from '../../../utility/hooks/useSkin';

const ChartJS = () => {
  const { colors } = useContext(ThemeColors),
    { skin } = useSkin(),
    labelColor = skin === 'dark' ?
      '#b4b7bd' :
      '#6e6b7b',
    tooltipShadow = 'rgba(0, 0, 0, 0.25)',
    gridLineColor = 'rgba(200, 200, 200, 0.2)',
    lineChartPrimary = '#666ee8',
    lineChartDanger = '#ff4961',
    warningColorShade = '#ffbd1f',
    warningLightColor = '#FDAC34',
    successColorShade = '#28dac6',
    primaryColorShade = '#836AF9',
    infoColorShade = '#299AFF',
    yellowColor = '#ffe800',
    greyColor = '#4F5D70',
    blueColor = '#2c9aff',
    blueLightColor = '#84D0FF',
    greyLightColor = '#EDF1F4';

  return (
    <Fragment>
      <Breadcrumbs title='React ChartJS 2' data={[{ title: 'Charts' }, { title: 'ChartJS' }]} />
      <Row className='match-height'>
        <Col sm='12'>
          <p>
            React wrapper for Chart.js. Click{' '}
            <a href='https://github.com/jerairrest/react-chartjs-2' target='_blank' rel='noopener noreferrer'>
              here
            </a>{' '}
            for github repo.
          </p>
        </Col>
        <Col xl='6' sm='12'>
          <BarChart
            success={successColorShade}
            labelColor={labelColor}
            gridLineColor={gridLineColor} />
        </Col>
        <Col xl='6' sm='12'>
          <HorizontalBarChart
            info={colors.info.main}
            labelColor={labelColor}
            warning={colors.warning.main}
            gridLineColor={gridLineColor}
          />
        </Col>
        <Col sm='12'>
          <LineChart
            labelColor={labelColor}
            gridLineColor={gridLineColor}
            lineChartDanger={lineChartDanger}
            lineChartPrimary={lineChartPrimary}
            warningColorShade={warningColorShade}
          />
        </Col>
        <Col lg='6' sm='12'>
          <RadarChart labelColor={labelColor} gridLineColor={gridLineColor} />
        </Col>
        <Col lg='6' sm='12'>
          <PolarAreaChart
            greyColor={greyColor}
            labelColor={labelColor}
            yellowColor={yellowColor}
            primary={colors.primary.main}
            infoColorShade={infoColorShade}
            warningColorShade={warningColorShade}
            successColorShade={successColorShade}
          />
        </Col>
        <Col sm='12'>
          <BubbleChart
            labelColor={labelColor}
            yellowColor={yellowColor}
            gridLineColor={gridLineColor}
            primaryColorShade={primaryColorShade}
          />
        </Col>
        <Col lg='4' sm='12'>
          <DoughnutChart
            tooltipShadow={tooltipShadow}
            successColorShade={successColorShade}
            warningLightColor={warningLightColor}
            primary={colors.primary.main}
          />
        </Col>
        <Col lg='8' sm='12'>
          <ScatterChart
            labelColor={labelColor}
            yellowColor={yellowColor}
            gridLineColor={gridLineColor}
            primary={colors.primary.main}
            successColorShade={successColorShade}
          />
        </Col>
        <Col sm='12'>
          <AreaChart
            blueColor={blueColor}
            labelColor={labelColor}
            gridLineColor={gridLineColor}
            blueLightColor={blueLightColor}
            greyLightColor={greyLightColor}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default ChartJS;
