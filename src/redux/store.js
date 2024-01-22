/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

import sessionReducer from './sessions/reducer';
import seatReducer from './seats/reducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    seat: seatReducer,
});
const enhancer = devToolsEnhancer();

const store = createStore(rootReducer, enhancer);

export default store;
