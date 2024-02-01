import axios from 'axios';

const theMovieDBApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

const API_KEY = import.meta.env.VITE_API_KEY;

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
    const { data } = await theMovieDBApi.get(`trending/movie/${time_window}`, {
        params: {
            ...params,
            api_key: API_KEY,
            page
        }
    });
    return data;
};
