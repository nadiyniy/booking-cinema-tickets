export type SeatState = {
    selectedSeat: string;
    reservedSeats: string[];
    confirmedSeat: string;
    errorSeat: string | null;
    seats: string[];
};

export type SessionState = {
    sessionsDate: string[];
    sessions: string[];
    selectedDate: string;
    selectedSession: string;
    error: string | null;
    isLoading: boolean;
};

export type Store = {
    seat: SeatState;
    session: SessionState;
};
