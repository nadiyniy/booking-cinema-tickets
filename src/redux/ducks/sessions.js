/* eslint-disable default-param-last */
const SET_SELECTED_DATE = 'SET_SELECTED_DATE';
const SET_SELECTED_SESSION = 'SET_SELECTED_SESSION';
const SET_SESSIONS = 'SET_SESSIONS';

const initialState = {
    sessions: [],
    selectedDate: '',
    selectedSession: null,
    error: null,
    isLoading: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_DATE:
            return { ...state, selectedDate: action.payload };
        case SET_SELECTED_SESSION:
            return { ...state, selectedSession: action.payload };
        case SET_SESSIONS:
            return { ...state, sessions: action.payload };
        default:
            return state;
    }
}

export const setSelectedDate = (date) => ({ type: SET_SELECTED_DATE, payload: date });
export const setSelectedSession = (session) => ({ type: SET_SELECTED_SESSION, payload: session });
export const setSessions = (sessions) => ({ type: SET_SESSIONS, payload: sessions });

export const selectDate = (state) => state.session.selectedDate;
export const selectAllSessions = (state) => state.session.sessions;
export const selectSessions = (state) => state.session.selectedSession;
