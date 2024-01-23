import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './ducks/sessions';
import seatReducer from './ducks/seats';

const rootReducer = combineReducers({
    session: sessionReducer,
    seat: seatReducer,
});

const store = configureStore({
    reducer: rootReducer,
});
export default store;
