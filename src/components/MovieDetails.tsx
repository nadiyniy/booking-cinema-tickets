import { useEffect, useState } from 'react';
import { fetchMovieById } from '../services/apiMovies';
import { StyledContent } from '../styled/MovieDetailsStyled';
import { MovieDetailsTypes } from '../types/MovieDetailsTypes';
import PageLoader from './PageLoader';

const MovieDetails = ({ row }: any) => {
    const [movieDetails, setMovieDetails] = useState<MovieDetailsTypes | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchMovieById(row.id)
            .then((res) => {
                setMovieDetails(res);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return (
        <>
            {isLoading ? (
                <PageLoader />
            ) : (
                <StyledContent>
                    <img
                        width={200}
                        height={350}
                        src={
                            movieDetails?.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`
                                : '/public/movie-plug.png'
                        }
                        alt={movieDetails?.title}
                    />
                    <div>
                        <h2>
                            {movieDetails?.title} ({movieDetails?.release_date})
                        </h2>
                        <p>User score: {((movieDetails?.vote_average ?? 0) * 10).toFixed(2)}%</p>
                        <h3>Overview:</h3>
                        <p>{movieDetails?.overview}</p>
                        <h4>Genres:</h4>
                        <p>{movieDetails?.genres?.map((genre) => <span key={genre.id}>{genre.name} </span>)}</p>
                    </div>
                </StyledContent>
            )}
        </>
    );
};

export default MovieDetails;
