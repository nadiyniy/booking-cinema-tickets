import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles } from './styled/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <GlobalStyles />
            <App />
        </Provider>
    </BrowserRouter>
);

reportWebVitals();
