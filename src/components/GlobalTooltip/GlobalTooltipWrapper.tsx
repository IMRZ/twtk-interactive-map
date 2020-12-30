import React from 'react';
import { useStoreActions } from '../../store';

type TooltipWrapperProps = {
  children: React.ReactElement;
  tooltip: React.ReactElement;
};

const GlobalTooltipWrapper = (props: TooltipWrapperProps) => {
  const setTooltip = useStoreActions((actions) => actions.scaffold.setTooltip);

  if (!props.children) {
    return null;
  }

  return React.cloneElement(React.Children.only(props.children), {
    onMouseEnter: () => {
      setTooltip(props.tooltip);
    },
    onMouseLeave: () => {
      setTooltip(null);
    },
  });
};

export default GlobalTooltipWrapper;
