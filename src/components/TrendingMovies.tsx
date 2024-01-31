import { Container, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

import { fetchTrendingMovies } from '../services/apiMovies';

type Movie = {
    id: number;
    original_title?: string;
    title?: string;
    name?: string;
    poster_path: string;
};
const columns = [
    { name: 'id', title: 'ID' },
    { name: 'title', title: 'Title' },
    { name: 'poster', title: 'Poster' }
];

const TrendingMovies = () => {
    const [, setTrendingMovies] = useState<Movie[]>([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { results } = await fetchTrendingMovies();
                setTrendingMovies(results);
                const getRows = results?.map((movie: any) => ({
                    id: movie.id,
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
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [setRows]);

    return (
        <Container>
            <Typography variant="h3">Trending films</Typography>
            <Paper>
                <Grid rows={rows} columns={columns}>
                    <Table />
                    <TableHeaderRow />
                </Grid>
            </Paper>
        </Container>
    );
};

export default TrendingMovies;
