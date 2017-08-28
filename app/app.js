// Polyfills
import 'babel-polyfill';
import 'es6-promise/auto';
import 'isomorphic-fetch';
import './sources/internal/experimental/inject-custom-properties.js';

// Styles
//import 'sanitize.css/sanitize.css';

import { Provider } from 'react-redux';

// Routing
import Redirect from 'react-router-dom/Redirect';
import Route    from 'react-router-dom/Route';
import Switch   from 'react-router-dom/Switch';

import createBrowserHistory from 'history/createBrowserHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Utils
import { hasReduxDevToolExtension } from './sources/internal/utils';

// Cofigurations
import configureStore from './sources/store';

// Main containers
import App              from './sources/containers/App';
import DevTools         from './sources/containers/DevTools';
import NotFound         from './sources/containers/NotFound';

import routes from './sources/routes';

//import ConfirmationRenderer from './sources/components/ConfirmationRenderer';

const history = createBrowserHistory({
  //getUserConfirmation: ConfirmationRenderer
});

const containerNode = document.getElementById('app');

const initialState = {};
const store = configureStore(initialState, history);

const render = () => {
  ReactDOM.render(
    <div>
      <Provider store={ store }>
       <MuiThemeProvider>
          <ConnectedRouter history={ history }>
            <App>
              <Switch>

                <Redirect from='/index.html' to='/' />
                {
                  routes(store).map(({ path, exact, component, render }) =>
                    <Route key={ path } path={ path } exact={ exact } component={ component } render={ render } />
                  )
                }
                <Route component={ NotFound } />

              </Switch>
            </App>
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
      { process.env.NODE_ENV !== 'production' && !hasReduxDevToolExtension ? <DevTools store={ store } /> : null }
    </div>,
    containerNode
  );
};

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept([
    './sources/containers/App',
    './sources/reducers',
    './sources/routes'
  ], () => {
    ReactDOM.unmountComponentAtNode(containerNode);
    render();
  });
}

// disable react i18n
// if (!window.Intl) {
//   // We should wrap import to Promise for make HMR work in current page
//   (new Promise(resolve => { resolve(import('intl')) }))
//     .then(() => Promise.all([
//       import('intl/locale-data/jsonp/en.js'),
//       import('intl/locale-data/jsonp/ru.js'),
//     ]))
//     .then(() => render(translations))
//     .catch(err => { throw err });
// } else {
//   render(translations);
// }

render();

if (process.env.NODE_ENV !== 'production') {
  // according this issue https://github.com/garbles/why-did-you-update/issues/45
  let createClass = React.createClass;
  Object.defineProperty(React, 'createClass', {
    set: nextCreateClass => { createClass = nextCreateClass }
  });
  // disable noisy why did you update warnings
  // eslint-disable-next-line global-require
  // const { whyDidYouUpdate } = require('why-did-you-update');
  // whyDidYouUpdate(React, { exclude: [ /^DevTools/, /^DockMonitor/, /^Route/, /^Router/ ] });
}

// Install ServiceWorker and AppCache
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}