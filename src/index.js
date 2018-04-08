import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import store from './stores/store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const stores = {
  store
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
