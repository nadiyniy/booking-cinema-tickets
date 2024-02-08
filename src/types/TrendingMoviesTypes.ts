export type MovieRowProps = {
    poster?: React.ReactNode;
    title?: string;
    vote_average?: string;
    id: number;
};

export type MovieProps = {
    name?: string;
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

export type StateType = {
    rows: {
        vote_average: string;
        id: number;
        title: string;
        poster: JSX.Element;
    }[];
    columns: {
        name: string;
        title: string;
    }[];
};
