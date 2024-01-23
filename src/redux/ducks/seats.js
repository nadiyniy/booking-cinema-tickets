const SET_SELECTED_SEAT = 'SET_SELECTED_SEAT';
const SET_RESERVED_SEATS = 'SET_RESERVED_SEATS';
const SET_CONFIRMED_SEAT = 'SET_CONFIRMED_SEAT';
const SET_ERROR_SEAT = 'SET_ERROR_SEAT';
const SET_SEATS = 'SET_SEATS';

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
        case SET_SEATS:
            return { ...state, seats: action.payload };
        default:
            return state;
    }
}

export const setSelectedSeat = (seat) => ({ type: SET_SELECTED_SEAT, payload: seat });
export const setReservedSeats = (seats) => ({ type: SET_RESERVED_SEATS, payload: seats });
export const setConfirmedSeat = (seat) => ({ type: SET_CONFIRMED_SEAT, payload: seat });
export const setErrorSeat = (error) => ({ type: SET_ERROR_SEAT, payload: error });
export const setSeats = (seats) => ({ type: SET_SEATS, payload: seats });

export const selectSeats = (state) => state.seat.seats;
export const selectSelectedSeat = (state) => state.seat.selectedSeat;
export const selectReservedSeat = (state) => state.seat.reservedSeats;
export const selectConfirmSeat = (state) => state.seat.confirmedSeat;
export const selectErrorSeat = (state) => state.seat.errorSeat;
