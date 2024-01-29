import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getReservationsSeat, getSessionDetails } from '../../services/api';
import { SeatState, Store } from '../../types/StoreTypes';

enum SeatActionEnum {
    SET_SELECTED_SEAT = 'SET_SELECTED_SEAT',
    SET_RESERVED_SEATS = 'SET_RESERVED_SEATS',
    SET_CONFIRMED_SEAT = 'SET_CONFIRMED_SEAT',
    SET_ERROR_SEAT = 'SET_ERROR_SEAT',
    GET_SEATS = 'GET_SEATS',
    GET_SEATS_SUCCESS = 'GET_SEATS_SUCCESS',
    GET_RESERVED_SUCCESS = 'GET_RESERVED_SUCCESS'
}
const initialState: SeatState = {
    selectedSeat: '',
    reservedSeats: [],
    confirmedSeat: '',
    errorSeat: null,
    seats: [],
    isLoading: false
};

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case SeatActionEnum.SET_SELECTED_SEAT:
            return { ...state, selectedSeat: action.payload };
        case SeatActionEnum.SET_RESERVED_SEATS:
            return { ...state, reservedSeats: action.payload };
        case SeatActionEnum.SET_CONFIRMED_SEAT:
            return { ...state, confirmedSeat: action.payload };
        case SeatActionEnum.SET_ERROR_SEAT:
            return { ...state, errorSeat: action.payload };
        case SeatActionEnum.GET_SEATS:
            return { ...state, isLoading: true };
        case SeatActionEnum.GET_SEATS_SUCCESS:
            return { ...state, seats: action.payload, isLoading: false };
        case SeatActionEnum.GET_RESERVED_SUCCESS:
            return { ...state, confirmedSeat: action.payload };
        default:
            return state;
    }
}
export function* workerSeatDetails() {
    const { seats } = yield call(getSessionDetails);

    yield put({ type: SeatActionEnum.GET_SEATS_SUCCESS, payload: seats });
}
export function* workerSeatReservations() {
    const { message } = yield call(getReservationsSeat);
    yield put({ type: SeatActionEnum.GET_RESERVED_SUCCESS, payload: message });
}
export function* watchSession() {
    yield all([takeLatest('GET_SEATS', workerSeatDetails), takeLatest('LOAD_SEAT_R', workerSeatReservations)]);
}
export function* seatSaga() {
    yield watchSession();
}

export const setSelectedSeat = (seat: string) => ({ type: SeatActionEnum.SET_SELECTED_SEAT, payload: seat });
export const setReservedSeats = (seats: string[]) => ({ type: SeatActionEnum.SET_RESERVED_SEATS, payload: seats });
export const setConfirmedSeat = (seat: string) => ({ type: SeatActionEnum.SET_CONFIRMED_SEAT, payload: seat });
export const setErrorSeat = (error: string | null) => ({ type: SeatActionEnum.SET_ERROR_SEAT, payload: error });

export const selectSeats = (state: Store) => state.seat.seats;
export const selectSelectedSeat = (state: Store) => state.seat.selectedSeat;
export const selectReservedSeat = (state: Store) => state.seat.reservedSeats;
export const selectConfirmSeat = (state: Store) => state.seat.confirmedSeat;
export const selectErrorSeat = (state: Store) => state.seat.errorSeat;
export const selectIsLoading = (state: Store) => state.seat.isLoading;
