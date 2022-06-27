import {useEffect, useState} from 'react';
import axios from 'axios';
import classnames from 'classnames';
import Chart from 'react-apexcharts';
import * as Icon from 'react-feather';
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import {ISessionsDevice} from '../../../../domains/interfaces/card-analytics/ISessionsDevice';

const SessionByDevice = (
  props: {
        primary: string,
        warning: string,
        danger: string,
    },
) => {
  const [data, setData] = useState<ISessionsDevice | null>(null);

  useEffect(() => {
    axios.get('/card/card-analytics/sessions-device').then(res => setData(res.data));
  }, []);

  const options = {
      chart: {
        toolbar: {
          show: false,
        },
      },
      labels: ['Desktop', 'Mobile', 'Tablet'],
      dataLabels: {
        enabled: false,
      },
      legend: {show: false},
      comparedResult: [2, -3, 8],
      stroke: {width: 0},
      colors: [props.primary, props.warning, props.danger],
    },
    series = [58.6, 34.9, 6.5];

  const renderChartInfo = () => {
    if (data !== null) {
      return data.chart_info.map((item, index) => {
        const IconTag = item.icon;
        return (
          <div
            key={index}
            className={classnames('d-flex justify-content-between', {
              'mb-1': index !== data.chart_info.length - 1,
            })}
          >
            <div className='d-flex align-items-center'>
              <IconTag
                // @ts-ignore
                size={17}
                className={classnames({
                  [item.iconColor]: item.iconColor,
                })}
              />
              <span className='fw-bold ms-75 me-25'>{item.name}</span>
              <span>- {item.usage}%</span>
            </div>
            <div>
              <span>{item.upDown}%</span>
              {item.upDown > 0
                ? (
                  <Icon.ArrowUp size={14} className='ms-25 text-success'/>
                )
                : (
                  <Icon.ArrowDown size={14} className='ms-25 text-danger'/>
                )}
            </div>
          </div>
        );
      });
    }
  };

  return data !== null
    ? (
      <Card>
        <CardHeader className='align-items-end'>
          <CardTitle tag='h4'>Session By Device</CardTitle>
          <UncontrolledDropdown className='chart-dropdown'>
            <DropdownToggle color='' className='bg-transparent btn-sm border-0 p-50'>
                            Last 7 days
            </DropdownToggle>
            <DropdownMenu end>
              {data.last_days.map(item => (
                <DropdownItem className='w-100' key={item}>
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        </CardHeader>
        <CardBody>
          <Chart className='my-1' options={options} series={series} type='donut' height={300}/>
          {renderChartInfo()}
        </CardBody>
      </Card>
    )
    : null;
};
export default SessionByDevice;
