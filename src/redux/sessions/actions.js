import { SET_SELECTED_DATE, SET_SELECTED_SESSION, SET_SESSIONS } from './constants';

export const setSelectedDate = (date) => ({ type: SET_SELECTED_DATE, payload: date });
export const setSelectedSession = (session) => ({ type: SET_SELECTED_SESSION, payload: session });
export const setSessions = (sessions) => ({ type: SET_SESSIONS, payload: sessions });
