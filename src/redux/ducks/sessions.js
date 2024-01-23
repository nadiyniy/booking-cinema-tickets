/* eslint-disable require-yield */
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getDate, getSessions } from '../../services/api';

const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
const SET_SELECTED_SESSION = 'SET_SELECTED_SESSION';
const SET_SESSIONS = 'SET_SESSIONS';

const GET_DATE_SUCCESS = 'GET_DATE_SUCCESS';
const GET_SESSIONS_SUCCESS = 'GET_SESSIONS_SUCCESS';

const initialState = {
    sessionsDate: [],
    sessions: [],
    selectedDate: '',
    selectedSession: '',
    error: null,
    isLoading: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_DATE:
            return { ...state, selectedDate: action.payload };
        case SET_SELECTED_SESSION:
            return { ...state, selectedSession: action.payload };
        case GET_DATE_SUCCESS:
            return { ...state, sessionsDate: action.payload };
        case GET_SESSIONS_SUCCESS:
            return { ...state, sessions: action.payload };
        default:
            return state;
    }
}
export function* workerSessionDate() {
    const { date } = yield call(getDate);
    yield put({ type: GET_DATE_SUCCESS, payload: date });
}
export function* workerSessionSessions() {
    const { sessions } = yield call(getSessions);
    yield put({ type: GET_SESSIONS_SUCCESS, payload: sessions });
}
export function* watchSession() {
    yield all([takeLatest('LOAD_DATE', workerSessionDate), takeLatest('LOAD_SESSIONS', workerSessionSessions)]);
}
export function* sessionSaga() {
    yield watchSession();
}

export const setSelectedDate = (date) => ({ type: SET_SELECTED_DATE, payload: date });
export const setSelectedSession = (session) => ({ type: SET_SELECTED_SESSION, payload: session });
export const setSessions = (sessions) => ({ type: SET_SESSIONS, payload: sessions });

export const selectDate = (state) => state.session.selectedDate;
export const selectSessionsDate = (state) => state.session.sessionsDate;
export const selectAllSessions = (state) => state.session.sessions;
export const selectSessions = (state) => state.session.selectedSession;
