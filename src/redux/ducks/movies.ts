import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetchTrendingMovies } from '../../services/apiMovies';
import { Store, TrendingMoviesActionTypes, TrendingMoviesState } from '../../types';

enum TrendingMoviesEnum {
    TRENDING_MOVIES_SUCCESS = 'TRENDING_MOVIES_SUCCESS',
    LOAD_TRENDING_MOVIES = 'LOAD_TRENDING_MOVIES'
}

const initialState: TrendingMoviesState = {
    trendingMovies: [],
    totalPages: 0,
    totalResults: null,
    isLoading: false
};

export default function reducer(state = initialState, action: TrendingMoviesActionTypes) {
    switch (action.type) {
        case TrendingMoviesEnum.LOAD_TRENDING_MOVIES:
            return { ...state, isLoading: true };
        case TrendingMoviesEnum.TRENDING_MOVIES_SUCCESS:
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

export function* workerTrendingMovies() {
    const { data } = yield call(fetchTrendingMovies);
    yield put({ type: 'TRENDING_MOVIES_SUCCESS', payload: data });
}

export function* watchTrendingMovies() {
    yield all([takeLatest('LOAD_TRENDING_MOVIES', workerTrendingMovies)]);
}

export function* trendingMoviesSaga() {
    yield watchTrendingMovies();
}

export const selectTrendingMovies = (state: Store) => state.movie.trendingMovies;
export const selectIsLoading = (state: Store) => state.movie.isLoading;
export const selectTotalPages = (state: Store) => state.movie.totalPages;
export const selectTotalResults = (state: Store) => state.movie.totalResults;
