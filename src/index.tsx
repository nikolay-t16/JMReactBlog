import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import 'focus-visible';

import 'antd/dist/antd.css';
import './index.scss';

import reducer from './redux/reducer';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { ApiProvider } from './components/contexts/apiContext';
import { productionReady } from './helpers/ProductionReady';

// @ts-ignore
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = typeof window === 'object' && reduxDevTools ? reduxDevTools({}) : compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider value={productionReady}>
        <App />
      </ApiProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
