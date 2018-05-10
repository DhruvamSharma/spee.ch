import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Reducers, GAListener, App } from 'spee.ch-components';
/*
  ^ note: to do this right, maybe
  these should be passed in from the implementation (www.spee.ch) itself,
  so that there are no conflicts between the SSR here and
  the bundle sent to the server?
  there might also be issues if this package uses a different version of spee.ch-components than www.spee.ch does?
*/
import renderFullPage from '../renderFullPage.js';
import Helmet from 'react-helmet';

const siteConfig = require('../../../config/siteConfig.js');
const viewsConfig = require('../../../config/viewsConfig.js');

module.exports = (req, res) => {
  let context = {};

  // customize the reducer & app by passing in intial state configs
  const MyReducers = Reducers(siteConfig, viewsConfig);
  const MyApp = App;
  const MyGAListener = GAListener(siteConfig);

  // create a new Redux store instance
  const store = createStore(MyReducers);

  // render component to a string
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <MyGAListener>
          <MyApp store={store} />
        </MyGAListener>
      </StaticRouter>
    </Provider>
  );

  // get head tags from helmet
  const helmet = Helmet.renderStatic();

  // check for a redirect
  if (context.url) {
    // Somewhere a `<Redirect>` was rendered
    return res.redirect(301, context.url);
  } else {
    // we're good, send the response
  }

  // get the initial state from our Redux store
  const preloadedState = store.getState();

  // send the rendered page back to the client
  res.send(renderFullPage(helmet, html, preloadedState));
};
