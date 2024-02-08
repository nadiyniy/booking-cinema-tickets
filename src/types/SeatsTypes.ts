enum SeatActionEnum {
    SET_SELECTED_SEAT = 'SET_SELECTED_SEAT',
    SET_RESERVED_SEATS = 'SET_RESERVED_SEATS',
    SET_CONFIRMED_SEAT = 'SET_CONFIRMED_SEAT',
    SET_ERROR_SEAT = 'SET_ERROR_SEAT',
    GET_SEATS = 'GET_SEATS',
    GET_SEATS_SUCCESS = 'GET_SEATS_SUCCESS',
    GET_RESERVED_SUCCESS = 'GET_RESERVED_SUCCESS'
}

type SetSelectedSeatAction = {
    type: SeatActionEnum.SET_SELECTED_SEAT;
    payload: string;
};

type SetReservedSeatsAction = {
    type: SeatActionEnum.SET_RESERVED_SEATS;
    payload: string[];
};

type SetConfirmedSeatAction = {
    type: SeatActionEnum.SET_CONFIRMED_SEAT;
    payload: string;
};

type SetErrorSeatAction = {
    type: SeatActionEnum.SET_ERROR_SEAT;
    payload: string | null;
};

type GetSeatsAction = {
    type: SeatActionEnum.GET_SEATS;
};

type GetSeatsSuccessAction = {
    type: SeatActionEnum.GET_SEATS_SUCCESS;
    payload: string[];
};

type GetReservedSuccessAction = {
    type: SeatActionEnum.GET_RESERVED_SUCCESS;
    payload: string;
};

export type SeatActionTypes =
    | SetSelectedSeatAction
    | SetReservedSeatsAction
    | SetConfirmedSeatAction
    | SetErrorSeatAction
    | GetSeatsAction
    | GetSeatsSuccessAction
    | GetReservedSuccessAction;
