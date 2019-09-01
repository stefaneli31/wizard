import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

import Wizard from './containers/Wizard';
import 'normalize.css';
import './styles.css';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Wizard/>
  </Provider>
);


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
