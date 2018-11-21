import * as React from 'react';
import ReactDOM from 'react-dom';
import RootView from './views/';
import { ROOT_NODE } from './constants';
import { Provider } from 'react-redux';

import { default as store } from './store';

require('./styles/style.sass');

const App = () => {
    return (
        <Provider {...{ store }}>
            <RootView />
        </Provider>
    );
};

const render = () => ReactDOM.render(<App />, ROOT_NODE);

render();