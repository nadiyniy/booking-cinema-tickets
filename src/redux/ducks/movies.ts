import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchTrendingMovies } from '../../services/apiMovies';
import { Store, TrendingMoviesState } from '../../types/StoreTypes';

enum TrendingMoviesEnum {
    TRAINING_MOVIES_SUCCESS = 'TRAINING_MOVIES_SUCCESS',
    LOAD_TRAINING_MOVIES = 'LOAD_TRAINING_MOVIES'
}

const initialState: TrendingMoviesState = {
    trendingMovies: [],
    totalPages: 0,
    totalResults: null,
    isLoading: false
};

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case TrendingMoviesEnum.LOAD_TRAINING_MOVIES:
            return { ...state, isLoading: true };
        case TrendingMoviesEnum.TRAINING_MOVIES_SUCCESS:
            return {
                ...state,
                trendingMovies: action.payload.results,
                totalPages: action.payload.total_pages,
                totalResults: action.payload.total_results,
                isLoading: false
            };
        default:
            return state;
    }
}

export function* workerTrendingMovies(action: any): Generator<any, void, any> {
    const { time, page } = action.payload;
    const data = yield call(fetchTrendingMovies, time, page);

    yield put({ type: TrendingMoviesEnum.TRAINING_MOVIES_SUCCESS, payload: data });
}

export function* watchTrendingMovies() {
    yield all([takeLatest(TrendingMoviesEnum.LOAD_TRAINING_MOVIES, workerTrendingMovies)]);
}

export function* trendingMoviesSaga() {
    yield watchTrendingMovies();
}

export const selectTrendingMovies = (state: Store) => state.movie.trendingMovies;
export const selectIsLoading = (state: Store) => state.movie.isLoading;
export const selectTotalPages = (state: Store) => state.movie.totalPages;
export const selectTotalResults = (state: Store) => state.movie.totalResults;
