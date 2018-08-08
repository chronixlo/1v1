import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import localGameStore from './stores/localGameStore';
import onlineGameStore from './stores/onlineGameStore';
import appStore from './stores/appStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const stores = {
  appStore,
  localGameStore,
  onlineGameStore
};

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
