import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getReservationsSeat, getSessionDetails } from '../../services/api';
import { SeatActionTypes, SeatState, Store } from '../../types';

const initialState: SeatState = {
    selectedSeat: '',
    reservedSeats: [],
    confirmedMessageSeat: '',
    errorSeat: null,
    seats: [],
    isLoading: false
};

export default function reducer(state = initialState, action: SeatActionTypes) {
    switch (action.type) {
        case 'SET_SELECTED_SEAT':
            return { ...state, selectedSeat: action.payload };
        case 'SET_RESERVED_SEATS':
            return { ...state, reservedSeats: action.payload };
        case 'SET_CONFIRMED_SEAT':
            return { ...state, confirmedMessageSeat: action.payload };
        case 'SET_ERROR_SEAT':
            return { ...state, errorSeat: action.payload };
        case 'GET_SEATS':
            return { ...state, isLoading: true };
        case 'GET_SEATS_SUCCESS':
            return { ...state, seats: action.payload, isLoading: false };
        case 'GET_RESERVED_SUCCESS':
            return { ...state, confirmedMessageSeat: action.payload };
        default:
            return state;
    }
}
export function* workerSeatDetails() {
    const { seats } = yield call(getSessionDetails);

    yield put({ type: 'GET_SEATS_SUCCESS', payload: seats });
}
export function* workerSeatReservations() {
    const { message } = yield call(getReservationsSeat);
    yield put({ type: 'GET_RESERVED_SUCCESS', payload: message });
}
export function* watchSession() {
    yield all([takeLatest('GET_SEATS', workerSeatDetails), takeLatest('LOAD_SEAT_R', workerSeatReservations)]);
}
export function* seatSaga() {
    yield watchSession();
}

export const setSelectedSeat = (seat: string) => ({ type: 'SET_SELECTED_SEAT', payload: seat });
export const setReservedSeats = (seats: string[]) => ({ type: 'SET_RESERVED_SEATS', payload: seats });
export const setConfirmedSeat = (seat: string) => ({ type: 'SET_CONFIRMED_SEAT', payload: seat });
export const setErrorSeat = (error: string | null) => ({ type: 'SET_ERROR_SEAT', payload: error });

export const selectSeats = (state: Store) => state.seat.seats;
export const selectSelectedSeat = (state: Store) => state.seat.selectedSeat;
export const selectReservedSeat = (state: Store) => state.seat.reservedSeats;
export const selectConfirmSeat = (state: Store) => state.seat.confirmedMessageSeat;
export const selectErrorSeat = (state: Store) => state.seat.errorSeat;
export const selectIsLoading = (state: Store) => state.seat.isLoading;
