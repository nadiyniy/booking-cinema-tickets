export type SeatState = {
    selectedSeat: string;
    reservedSeats: string[];
    confirmedMessageSeat: string;
    errorSeat: string | null;
    seats: string[];
    isLoading: boolean;
};

export type SessionState = {
    sessionsDate: string[];
    sessions: string[];
    selectedDate: string;
    selectedSession: string;
    error: string | null;
    isLoading: boolean;
};
export type TrendingMoviesState = {
    trendingMovies: string[];
    isLoading: boolean;
};

export type Store = {
    seat: SeatState;
    session: SessionState;
    movie: TrendingMoviesState;
};
