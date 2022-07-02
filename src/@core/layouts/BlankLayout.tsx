import { Outlet } from 'react-router-dom';
import classnames from 'classnames';
import {useEffect, useState} from 'react';
import {useSkin} from '../../utility/hooks/useSkin';

const BlankLayout = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { skin } = useSkin();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={classnames('blank-page', {
        'dark-layout': skin === 'dark',
      })}
    >
      <div className='app-content content'>
        <div className='content-wrapper'>
          <div className='content-body'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlankLayout;
