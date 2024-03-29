import { MovieProps } from '.';

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
    trendingMovies: MovieProps[];
    isLoading: boolean;
    totalPages?: number | null;
    totalResults?: number | null;
};

export type Store = {
    seat: SeatState;
    session: SessionState;
    movie: TrendingMoviesState;
};
