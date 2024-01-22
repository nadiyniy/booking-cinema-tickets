import { SET_CONFIRMED_SEAT, SET_ERROR_SEAT, SET_RESERVED_SEATS, SET_SEATS, SET_SELECTED_SEAT } from './constants';

export const setSelectedSeat = (seat) => ({ type: SET_SELECTED_SEAT, payload: seat });
export const setReservedSeats = (seats) => ({ type: SET_RESERVED_SEATS, payload: seats });
export const setConfirmedSeat = (seat) => ({ type: SET_CONFIRMED_SEAT, payload: seat });
export const setErrorSeat = (error) => ({ type: SET_ERROR_SEAT, payload: error });
export const setSeats = (seats) => ({ type: SET_SEATS, payload: seats });
