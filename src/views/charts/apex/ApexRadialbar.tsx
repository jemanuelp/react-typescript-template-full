import Chart from 'react-apexcharts';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import {ApexOptions} from 'apexcharts';

const ApexRadialbar = () => {
  const donutColors = {
    series1: '#ffe700',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#2b9bf4',
    series5: '#FFA1A1',
  };

  // ** Chart Options
  const options: ApexOptions = {
    colors: [donutColors.series1, donutColors.series2, donutColors.series4],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '25%',
        },
        track: {
          margin: 15,
        },
        dataLabels: {
          name: {
            fontSize: '2rem',
            fontFamily: 'Montserrat',
          },
          value: {
            fontSize: '1rem',
            fontFamily: 'Montserrat',
          },
          total: {
            show: true,
            fontSize: '1rem',
            label: 'Comments',
            formatter() {
              return '80%';
            },
          },
        },
      },
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30,
      },
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Comments', 'Replies', 'Shares'],
  };

  return (
    <Card>
      <CardHeader className='d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start'>
        <CardTitle tag='h4'>Statistics</CardTitle>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={[80, 50, 35]} type='radialBar' height={350} />
      </CardBody>
    </Card>
  );
};

export default ApexRadialbar;
