/* eslint-disable default-param-last */
import { SET_SELECTED_DATE, SET_SELECTED_SESSION, SET_SESSIONS } from './constants';

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
