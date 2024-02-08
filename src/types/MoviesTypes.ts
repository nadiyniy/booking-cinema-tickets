enum TrendingMoviesEnum {
    LOAD_TRENDING_MOVIES = 'LOAD_TRENDING_MOVIES',
    TRENDING_MOVIES_SUCCESS = 'TRENDING_MOVIES_SUCCESS'
}

type LoadTrendingMoviesAction = {
    type: TrendingMoviesEnum.LOAD_TRENDING_MOVIES;
    payload: {
        time: string;
        page: number;
    };
};

type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

type TrendingMoviesSuccessAction = {
    type: TrendingMoviesEnum.TRENDING_MOVIES_SUCCESS;
    payload: {
        results: Movie[];
        total_pages: number;
        total_results: number | null;
    };
};

export type TrendingMoviesActionTypes = LoadTrendingMoviesAction | TrendingMoviesSuccessAction;
