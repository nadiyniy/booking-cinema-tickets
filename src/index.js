import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { GlobalStyles } from './styled/GlobalStyles';

import store from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <GlobalStyles />
            <App />
        </Provider>
    </BrowserRouter>,
);

reportWebVitals();
