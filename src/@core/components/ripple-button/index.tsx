import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Button } from 'reactstrap';
import './ripple-button.scss';

const RippleButton = ({ className, children, onClick, ...rest }: any) => {
  const [mounted, setMounted] = useState(false);
  const [isRippling, setIsRippling] = useState(false);
  const [coords, setCoords] = useState({ x: -1, y: -1 });

  // ** Toggle mounted on mount & unmount
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // ** Check for coords and set ripple
  useEffect(() => {
    if (mounted) {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 500);
      } else {
        setIsRippling(false);
      }
    }
  }, [coords]);

  // ** Reset Coords on ripple end
  useEffect(() => {
    if (mounted) {
      if (!isRippling) setCoords({ x: -1, y: -1 });
    }
  }, [isRippling]);

  return (
    <Button
      className={classnames('waves-effect', {
        [className]: className,
      })}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        if (onClick) {
          onClick(e);
        }
      }}
      {...rest}
    >
      {children}
      {isRippling ?
        (
          <span
            className='waves-ripple'
            style={{
              left: coords.x,
              top: coords.y,
            }}
          ></span>
        ) :
        null}
    </Button>
  );
};
