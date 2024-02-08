import axios from 'axios';

const theMovieDBApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

const API_KEY = '13f507f7afd2e84a62cca8b12f55dea4';

export type timeWindowType = 'day' | 'week';
export type ParamsType = {
    page?: number;
    query?: string;
};

export const fetchTrendingMovies = async (
    time_window: timeWindowType = 'day',
    page: number = 1,
    params?: ParamsType
) => {
    const data = await theMovieDBApi.get(`trending/movie/${time_window}`, {
        params: {
            ...params,
            api_key: API_KEY,
            page
        }
    });

    return data;
};

export const fetchMovieById = async (id: number) => {
    const { data } = await theMovieDBApi.get(`movie/${id}`, {
        params: {
            api_key: API_KEY
        }
    });

    return data;
};
