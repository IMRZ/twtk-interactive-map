import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { useStoreState, useStoreActions } from '../../store';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    zIndex: 3000,
    transition: 'opacity 0.3s',
  },
  hidden: {
    opacity: 0,
  },
}));

const CURSOR_OFFSET = 16;

const GlobalTooltip = () => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (ref.current) {
      const tooltipWidth = ref.current.offsetWidth;
      const x = e.x + tooltipWidth + (CURSOR_OFFSET * 2) >= window.innerWidth
        ? e.x - CURSOR_OFFSET - tooltipWidth
        : e.x + CURSOR_OFFSET;

      const tooltipHeight = ref.current.offsetHeight;
      const y = e.y + tooltipHeight + (CURSOR_OFFSET * 2) >= window.innerHeight
        ? e.y - CURSOR_OFFSET - tooltipHeight
        : e.y + CURSOR_OFFSET;

      setStyle({ transform: `translate(${x}px, ${y}px)` });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    setStyle({ display: 'none' });
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  const tooltip = useStoreState((state) => state.scaffold.tooltip);
  const setTooltip = useStoreActions((actions) => actions.scaffold.setTooltip);
  const location = useLocation();
  useEffect(() => {
    setTooltip(null);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={ref}
      className={clsx([classes.root, { [classes.hidden]: !tooltip }])}
      style={style}
    >
      {tooltip}
    </div>
  );
};

export default GlobalTooltip;
