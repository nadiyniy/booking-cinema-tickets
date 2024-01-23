import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import sessionReducer, { sessionSaga } from './ducks/sessions';
import seatReducer from './ducks/seats';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    session: sessionReducer,
    seat: seatReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(sessionSaga);

export default store;
