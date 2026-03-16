import React, { useCallback, useEffect } from 'react';
import { useStoreActions } from '../../store';

type TooltipWrapperProps = {
  children: React.ReactElement;
  tooltip: React.ReactElement;
};

const GlobalTooltipWrapper = (props: TooltipWrapperProps) => {
  const setTooltip = useStoreActions((actions) => actions.scaffold.setTooltip);
  const updateTooltip = useStoreActions((actions) => actions.scaffold.updateTooltip);

  const onMouseEnter = useCallback(() => {
    setTooltip(props.tooltip);
  }, [props.tooltip]); // eslint-disable-line react-hooks/exhaustive-deps

  const onMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    updateTooltip(props.tooltip);
  }, [props.tooltip]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!props.children) {
    return null;
  }

  return React.cloneElement(
    React.Children.only(props.children),
    { onMouseEnter, onMouseLeave }
  );
};

export default GlobalTooltipWrapper;
