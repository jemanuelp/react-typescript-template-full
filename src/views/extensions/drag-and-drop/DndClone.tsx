import { useState } from 'react';
import classnames from 'classnames';
import { ReactSortable } from 'react-sortablejs';
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Badge } from 'reactstrap';
import {useRTL} from '../../../utility/hooks/useRTL';
import {DndCloneData} from '../interfaces/DndCloneData';

const DndClone = () => {
  const {isRtl} = useRTL();

  const source1: DndCloneData[] = [
    {
      id: 1,
      text: 'Youtube',
      color: 'light-secondary',
    },
    {
      id: 2,
      text: 'Facebook',
      color: 'light-primary',
    },
    {
      id: 3,
      text: 'Google',
      color: 'light-success',
    },
    {
      id: 4,
      text: 'Instagram',
      color: 'light-danger',
    },
    {
      id: 5,
      text: 'Twitter',
      color: 'light-info',
    },
    {
      id: 6,
      text: 'Discord',
      color: 'light-warning',
    },
  ];
  const source2: DndCloneData[] = [
    {
      id: 1,
      text: 'Github',
      color: 'light-secondary',
    },
    {
      id: 2,
      text: 'Gitlab',
      color: 'light-primary',
    },
    {
      id: 3,
      text: 'Slack',
      color: 'light-success',
    },
    {
      id: 4,
      text: 'Pinterest',
      color: 'light-danger',
    },
    {
      id: 5,
      text: 'Tinder',
      color: 'light-info',
    },
    {
      id: 6,
      text: 'Amazon',
      color: 'light-warning',
    },
  ];

  const [list, setList] = useState<DndCloneData[]>(source1);
  const [list2, setList2] = useState<DndCloneData[]>(source2);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Clone List</CardTitle>
      </CardHeader>
      <CardBody>
        <CardText>
          Add <code>pull:clone</code> with your group prop to clone items.
        </CardText>
        <Row>
          <Col md='6' sm='12'>
            <h4 className='my-1'>Badge Source 1</h4>
            <ReactSortable
              list={list}
              setList={setList}
              group={{ name: 'shared-badge-group', pull: 'clone' }}
              className={classnames('demo-inline-spacing sortable', {
                'flex-row-reverse': isRtl,
              })}
            >
              {list.map((item, index) => {
                return (
                  <Badge className='draggable' key={`${item.text}-${index}`} color={item.color} pill>
                    {item.text}
                  </Badge>
                );
              })}
            </ReactSortable>
          </Col>
          <Col md='6' sm='12'>
            <h4 className='my-1'>Badge Source 2</h4>
            <ReactSortable
              list={list2}
              setList={setList2}
              group={{ name: 'shared-badge-group', pull: 'clone' }}
              className={classnames('demo-inline-spacing sortable', {
                'flex-row-reverse': isRtl,
              })}
            >
              {list2.map((item, index) => {
                return (
                  <Badge className='draggable' key={`${item.text}-${index}`} color={item.color} pill>
                    {item.text}
                  </Badge>
                );
              })}
            </ReactSortable>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default DndClone;
