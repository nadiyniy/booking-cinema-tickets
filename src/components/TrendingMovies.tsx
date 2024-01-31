import { Container, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoading, selectTrendingMovies } from '../redux/ducks/movies';
import PageLoader from './PageLoader';
import { MovieRow } from '../types/TrendingMoviesTypes';

const columns = [
    { name: 'vote_average', title: 'Vote average' },
    { name: 'title', title: 'Title' },
    { name: 'poster', title: 'Poster' }
];

const TrendingMovies = () => {
    const [rows, setRows] = useState<MovieRow[]>([]);
    const trendingMovies = useSelector(selectTrendingMovies);
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'LOAD_TRAINING_MOVIES' });
    }, []);

    useEffect(() => {
        const getRows = trendingMovies?.map((movie: any) => ({
            vote_average: movie.vote_average.toFixed(1),
            title: movie.original_title ?? movie.title ?? movie.name,
            poster: (
                <img
                    width={100}
                    src={
                        movie?.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                            : '/public/images.png'
                    }
                />
            )
        }));

        setRows(getRows);
    }, [trendingMovies]);

    return (
        <>
            {isLoading ? (
                <PageLoader />
            ) : (
                <Container>
                    <Typography align="center" variant="h3">
                        Trending films
                    </Typography>
                    <Paper>
                        <Grid rows={rows} columns={columns}>
                            <Table />
                            <TableHeaderRow />
                        </Grid>
                    </Paper>
                </Container>
            )}
        </>
    );
};

export default TrendingMovies;
