import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { productsReducer } from './reducers/productsReducer';
import thunk from './lib/myThunk';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const middleware = applyMiddleware(thunk, logger);

const store = createStore(productsReducer, middleware);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
