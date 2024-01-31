import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../services/apiMovies';

type Movie = {
    id: number;
    original_title?: string;
    title?: string;
    name?: string;
    poster_path: string;
};

const TrendingMovies = () => {
    const [trendingMovies, setTrendingMovies] = useState<Movie[] | undefined>();
    console.log(trendingMovies);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { results } = await fetchTrendingMovies();
                setTrendingMovies(results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Typography variant="h3">hello world</Typography>
            <ul>
                {trendingMovies?.map((movie) => (
                    <li key={movie.id}>
                        {movie.original_title ?? movie.title ?? movie.name}{' '}
                        <img
                            width={200}
                            height={350}
                            src={
                                movie?.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQju-zj4n6hRiWsnJfgNALcjvXBuMuUtPQP7FIskz9LhOnrogjzZSdSbkirqmngfDeMHd4&usqp=CAU'
                            }
                            alt={movie.title}
                        />
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default TrendingMovies;
