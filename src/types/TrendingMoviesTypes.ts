export type MovieProps = {
    adult?: boolean;
    backdrop_path?: string;
    id?: number;
    title?: any;
    original_language?: string;
    original_title?: string;
    overview?: string;
    poster_path?: string;
    media_type?: string;
    genre_ids?: number[];
    popularity?: number;
    release_date?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
};

export type MovieRowProps = {
    poster?: React.ReactNode;
    title?: string;
    vote_average?: string;
    id: number;
};
