import { Container, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Grid, Table, TableHeaderRow, PagingPanel } from '@devexpress/dx-react-grid-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { CustomPaging, IntegratedSorting, PagingState, Sorting, SortingState } from '@devexpress/dx-react-grid';

import { selectIsLoading, selectTotalPages, selectTrendingMovies } from '../redux/ducks/movies';
import PageLoader from './PageLoader';
import { MovieRow } from '../types/TrendingMoviesTypes';

const HighlightedCell = ({ value, style, ...restProps }: any) => (
    <Table.Cell {...restProps} style={{ backgroundColor: value < 7 ? 'yellow' : undefined, ...style }}>
        <span>{value}</span>
    </Table.Cell>
);
const Cell = (props: any) => {
    const { column } = props;
    if (column.name === 'vote_average') {
        return <HighlightedCell {...props} />;
    }
    return <Table.Cell {...props} />;
};

const TrendingMovies = () => {
    const [rows, setRows] = useState<MovieRow[]>([]);
    const [columns] = useState([
        { name: 'vote_average', title: 'Vote average' },
        { name: 'title', title: 'Title' },
        { name: 'poster', title: 'Poster' }
    ]);
    const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
        { columnName: 'poster', align: 'right' },
        { columnName: 'vote_average', width: '150px', wordWrapEnabled: true }
    ]);
    const [sortingStateColumnExtensions] = useState([
        { columnName: 'title', sortingEnabled: false },
        { columnName: 'poster', sortingEnabled: false }
    ]);
    const [sorting, setSorting] = useState<Sorting[]>([{ columnName: 'vote_average', direction: 'asc' }]);

    const trendingMovies = useSelector(selectTrendingMovies);
    const isLoading = useSelector(selectIsLoading);
    const totalPages = useSelector(selectTotalPages);
    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'LOAD_TRAINING_MOVIES', payload: { time: 'day', page: currentPage + 1 } });
    }, [currentPage]);

    useEffect(() => {
        const getRows = trendingMovies?.map((movie: any) => ({
            vote_average: movie.vote_average.toFixed(1),
            title: movie.original_title ?? movie.title ?? movie.name,
            poster: (
                <img
                    width={100}
                    style={{ marginLeft: 'auto' }}
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
                            <PagingState
                                currentPage={currentPage}
                                onCurrentPageChange={setCurrentPage}
                                pageSize={trendingMovies.length}
                            />
                            <CustomPaging totalCount={totalPages ?? 0} />
                            <SortingState
                                sorting={sorting}
                                onSortingChange={setSorting}
                                columnExtensions={sortingStateColumnExtensions}
                            />
                            <IntegratedSorting />
                            <Table cellComponent={Cell} columnExtensions={tableColumnExtensions} />
                            <TableHeaderRow showSortingControls />

                            <PagingPanel />
                        </Grid>
                    </Paper>
                </Container>
            )}
        </>
    );
};

export default TrendingMovies;
