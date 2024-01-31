import axios from 'axios';

const theMovieDBApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

const API_KEY = import.meta.env.VITE_API_KEY;

type timeWindowType = 'day' | 'week';
type ParamsType = {
    page?: number;
    query?: string;
};

export const fetchTrendingMovies = async (time_window: timeWindowType = 'day', params?: ParamsType) => {
    const { data } = await theMovieDBApi.get(`trending/movie/${time_window}`, {
        params: {
            ...params,
            api_key: API_KEY
        }
    });
    return data;
};
