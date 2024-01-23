import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getReservationsSeat, getSessionDetails } from '../../services/api';

const SET_SELECTED_SEAT = 'SET_SELECTED_SEAT';
const SET_RESERVED_SEATS = 'SET_RESERVED_SEATS';
const SET_CONFIRMED_SEAT = 'SET_CONFIRMED_SEAT';
const SET_ERROR_SEAT = 'SET_ERROR_SEAT';

const GET_SEATS_SUCCESS = 'GET_SEATS_SUCCESS';
const GET_RESERVED_SUCCESS = 'GET_RESERVED_SUCCESS';

const initialState = {
    selectedSeat: '',
    reservedSeats: [],
    confirmedSeat: '',
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
        case GET_SEATS_SUCCESS:
            return { ...state, seats: action.payload };
        case GET_RESERVED_SUCCESS:
            return { ...state, confirmedSeat: action.payload };
        default:
            return state;
    }
}
export function* workerSeatDetails() {
    const { seats } = yield call(getSessionDetails);
    yield put({ type: GET_SEATS_SUCCESS, payload: seats });
}
export function* workerSeatReservations() {
    const { message } = yield call(getReservationsSeat);
    yield put({ type: GET_RESERVED_SUCCESS, payload: message });
}
export function* watchSession() {
    yield all([takeLatest('LOAD_SEAT', workerSeatDetails), takeLatest('LOAD_SEAT_R', workerSeatReservations)]);
}
export function* seatSaga() {
    yield watchSession();
}

export const setSelectedSeat = (seat) => ({ type: SET_SELECTED_SEAT, payload: seat });
export const setReservedSeats = (seats) => ({ type: SET_RESERVED_SEATS, payload: seats });
export const setConfirmedSeat = (seat) => ({ type: SET_CONFIRMED_SEAT, payload: seat });
export const setErrorSeat = (error) => ({ type: SET_ERROR_SEAT, payload: error });

export const selectSeats = (state) => state.seat.seats;
export const selectSelectedSeat = (state) => state.seat.selectedSeat;
export const selectReservedSeat = (state) => state.seat.reservedSeats;
export const selectConfirmSeat = (state) => state.seat.confirmedSeat;
export const selectErrorSeat = (state) => state.seat.errorSeat;
