import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import setupStore from './config';
import SetupRoutes from './config/SetupRoutes';

import registerServiceWorker from './registerServiceWorker';

const store = setupStore();

ReactDOM.render(
    <Provider store={store} >
        <SetupRoutes />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();