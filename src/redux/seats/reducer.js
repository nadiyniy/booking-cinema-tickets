/* eslint-disable default-param-last */

import { SET_CONFIRMED_SEAT, SET_ERROR_SEAT, SET_RESERVED_SEATS, SET_SEATS, SET_SELECTED_SEAT } from './constants';

const initialState = {
    selectedSeat: null,
    reservedSeats: [],
    confirmedSeat: null,
    errorSeat: null,
    seats: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_SEAT:
            return { ...state, selectedSeat: action.payload };
        case SET_RESERVED_SEATS:
            return { ...state, reservedSeats: action.payload };
        case SET_CONFIRMED_SEAT:
            return { ...state, confirmedSeat: action.payload };
        case SET_ERROR_SEAT:
            return { ...state, errorSeat: action.payload };
        case SET_SEATS:
            return { ...state, seats: action.payload };
        default:
            return state;
    }
}
