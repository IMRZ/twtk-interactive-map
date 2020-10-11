import { useCallback, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { useStoreState, useStoreActions } from '../../store';

export function useMainScaffold() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const appDrawerOpen = useStoreState((state) => state.scaffold.appDrawerOpen);
  const mobileDrawerOpen = useStoreState((state) => state.scaffold.mobileDrawerOpen);
  const setAppDrawerOpen = useStoreActions((actions) => actions.scaffold.setAppDrawerOpen);
  const setMobileDrawerOpen = useStoreActions((actions) => actions.scaffold.setMobileDrawerOpen);


  const toggleDrawer = useCallback(() => {
    if (isMobile) {
      setMobileDrawerOpen(!mobileDrawerOpen);
    } else {
      setAppDrawerOpen(!appDrawerOpen);
    }
  }, [appDrawerOpen, isMobile, mobileDrawerOpen, setAppDrawerOpen, setMobileDrawerOpen]);

  useEffect(() => {
    if (isMobile === false && mobileDrawerOpen === true) {
      setMobileDrawerOpen(false);
    }
  }, [isMobile, mobileDrawerOpen, setMobileDrawerOpen]);

  return {
    appDrawerOpen,
    mobileDrawerOpen,
    toggleDrawer,
  };
}
