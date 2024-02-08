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

type TrendingMoviesSuccessAction = {
    type: TrendingMoviesEnum.TRENDING_MOVIES_SUCCESS;
    payload: {
        results: any[];
        total_pages: number;
        total_results: number | null;
    };
};

export type TrendingMoviesActionTypes = LoadTrendingMoviesAction | TrendingMoviesSuccessAction;
