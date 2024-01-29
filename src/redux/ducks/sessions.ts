import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getDate, getSessions } from '../../services/api';
import { SessionState, Store } from '../../types/StoreTypes';

enum SessionStateEnum {
    SET_SELECTED_DATE = 'SET_SELECTED_DATE',
    SET_SELECTED_SESSION = 'SET_SELECTED_SESSION',
    SET_SESSIONS = 'SET_SESSIONS',
    GET_SESSIONS = 'GET_SESSIONS',
    GET_DATE_SUCCESS = 'GET_DATE_SUCCESS',
    GET_SESSIONS_SUCCESS = 'GET_SESSIONS_SUCCESS'
}
const initialState: SessionState = {
    sessionsDate: [],
    sessions: [],
    selectedDate: '',
    selectedSession: '',
    error: null,
    isLoading: false
};

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case SessionStateEnum.SET_SELECTED_DATE:
            return { ...state, selectedDate: action.payload };
        case SessionStateEnum.SET_SELECTED_SESSION:
            return { ...state, selectedSession: action.payload };
        case SessionStateEnum.GET_DATE_SUCCESS:
            return { ...state, sessionsDate: action.payload };
        case SessionStateEnum.GET_SESSIONS:
            return { ...state, isLoading: true };
        case SessionStateEnum.GET_SESSIONS_SUCCESS:
            return { ...state, sessions: action.payload, isLoading: false };
        default:
            return state;
    }
}
export function* workerSessionDate() {
    const { date } = yield call(getDate);
    yield put({ type: SessionStateEnum.GET_DATE_SUCCESS, payload: date });
}
export function* workerSession() {
    const { sessions } = yield call(getSessions);
    yield put({ type: SessionStateEnum.GET_SESSIONS_SUCCESS, payload: sessions });
}
export function* watchSession() {
    yield all([takeLatest('GET_DATE', workerSessionDate), takeLatest('GET_SESSIONS', workerSession)]);
}
export function* sessionSaga() {
    yield watchSession();
}

export const setSelectedDate = (date: string) => ({ type: SessionStateEnum.SET_SELECTED_DATE, payload: date });
export const setSelectedSession = (session: string) => ({
    type: SessionStateEnum.SET_SELECTED_SESSION,
    payload: session
});
export const setSessions = (sessions: string[]) => ({ type: SessionStateEnum.SET_SESSIONS, payload: sessions });

export const selectDate = (state: Store) => state.session.selectedDate;
export const selectSessionsDate = (state: Store) => state.session.sessionsDate;
export const selectAllSessions = (state: Store) => state.session.sessions;
export const selectSessions = (state: Store) => state.session.selectedSession;
export const selectIsLoading = (state: Store) => state.session.isLoading;
