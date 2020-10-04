import { useCallback, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { appDrawerOpenToggled, mobileDrawerOpenToggled } from './reducer';
import { useAppDispatch, useAppSelector } from '../../store';

export function useMainScaffold() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();
  const appDrawerOpen = useAppSelector((state) => state.scaffold.appDrawerOpen);
  const mobileDrawerOpen = useAppSelector((state) => state.scaffold.mobileDrawerOpen);

  const toggleDrawer = useCallback(() => {
    if (isMobile) {
      dispatch(mobileDrawerOpenToggled(!mobileDrawerOpen));
    } else {
      dispatch(appDrawerOpenToggled(!appDrawerOpen));
    }
  }, [dispatch, isMobile, appDrawerOpen, mobileDrawerOpen]);

  useEffect(() => {
    if (isMobile === false && mobileDrawerOpen === true) {
      dispatch(mobileDrawerOpenToggled(false));
    }
  }, [dispatch, isMobile, mobileDrawerOpen]);

  return {
    appDrawerOpen,
    mobileDrawerOpen,
    toggleDrawer,
  };
}
