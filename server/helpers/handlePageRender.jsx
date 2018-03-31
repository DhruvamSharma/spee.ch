import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { Reducers, GAListener, App } from 'spee.ch-components';
import renderFullPage from './renderFullPage.js';
import Helmet from 'react-helmet';

const siteConfig = require('siteConfig.js');

module.exports = (req, res) => {
  let context = {};

  // customize the reducer by passing in intial state configs
  const customizedReducers = Reducers(siteConfig);

  // create a new Redux store instance
  const store = createStore(customizedReducers);

  // render component to a string
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <GAListener>
          <App />
        </GAListener>
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

  console.log('hello from spee.ch handlePageRender.jsx');
};
