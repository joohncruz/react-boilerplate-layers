import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from 'Config/ServiceWorker';
import configureStore from 'Config/Store';

import App from './App';

import './index.scss';

const { store } = configureStore();

const main = (target) => {
  ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    target,
  );
};

main(document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();