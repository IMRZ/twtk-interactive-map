import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './config/theme';

import { StoreProvider } from 'easy-peasy';
import store from './store';

import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import 'leaflet/dist/leaflet.css';

import { I18nProvider } from './i18n';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <StoreProvider store={store}>
      <Suspense fallback="loading...">
        <I18nProvider>
          <Router basename={process.env.PUBLIC_URL}>
            <App />
          </Router>
        </I18nProvider>
      </Suspense>
    </StoreProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

serviceWorker.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event: any) => {
        if (event.target.state === 'activated') {
          window.location.reload();
        }
      });

      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  },
});
