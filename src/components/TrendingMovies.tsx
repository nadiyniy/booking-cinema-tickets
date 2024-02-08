import { useEffect, useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    SearchPanel,
    Toolbar,
    TableRowDetail
} from '@devexpress/dx-react-grid-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import {
    CustomPaging,
    IntegratedFiltering,
    IntegratedSorting,
    PagingState,
    RowDetailState,
    SearchState,
    Sorting,
    SortingState
} from '@devexpress/dx-react-grid';

import { PageLoader, MovieDetails } from '.';

import { selectIsLoading, selectTotalPages, selectTrendingMovies } from '../redux/ducks/movies';
import { MovieProps, StateType } from '../types';

const TrendingMovies = () => {
    const [state, setState] = useState<StateType>({
        rows: [],
        columns: [
            { name: 'vote_average', title: 'Vote average (is sortable)' },
            { name: 'title', title: 'Title' },
            { name: 'poster', title: 'Poster' },
            { name: 'id', title: 'ID' }
        ]
    });

    const [tableColumnExtensions] = useState<Table.ColumnExtension[] | undefined>([
        { columnName: 'poster', align: 'right' },
        { columnName: 'vote_average', wordWrapEnabled: true }
    ]);

    const [sorting, setSorting] = useState<Sorting[]>([]);
    const { rows, columns } = state;

    const trendingMovies = useSelector(selectTrendingMovies);
    const isLoading = useSelector(selectIsLoading);
    const totalPages = useSelector(selectTotalPages);
    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'LOAD_TRENDING_MOVIES', payload: { time: 'day', page: currentPage + 1 } });
    }, [currentPage]);

    useEffect(() => {
        if (trendingMovies) {
            const getRows = trendingMovies.map((movie: MovieProps) => ({
                vote_average: movie.vote_average.toFixed(1),
                id: movie.id,
                title: movie.original_title ?? movie.title ?? movie.name,
                poster: (
                    <img
                        width={40}
                        style={{ marginLeft: 'auto' }}
                        src={
                            movie?.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                                : '/public/images.png'
                        }
                    />
                )
            }));
            setState((prevState) => ({ ...prevState, rows: getRows }));
        }
    }, [trendingMovies]);

    return (
        <>
            {isLoading ? (
                <PageLoader />
            ) : (
                <Container>
                    <Typography align="center" variant="h2">
                        Trending films React Grid
                    </Typography>
                    <Paper>
                        <Grid rows={rows} columns={columns}>
                            <PagingState
                                currentPage={currentPage}
                                onCurrentPageChange={setCurrentPage}
                                pageSize={trendingMovies.length}
                            />
                            <SearchState defaultValue="" />
                            <IntegratedFiltering />
                            <CustomPaging totalCount={totalPages ?? 0} />
                            <SortingState
                                sorting={sorting}
                                onSortingChange={setSorting}
                                columnExtensions={[
                                    { columnName: 'title', sortingEnabled: false },
                                    { columnName: 'poster', sortingEnabled: false },
                                    { columnName: 'vote_average', sortingEnabled: true },
                                    { columnName: 'id', sortingEnabled: false }
                                ]}
                            />
                            <IntegratedSorting />
                            <Table columnExtensions={tableColumnExtensions} />

                            <TableHeaderRow showSortingControls />
                            <RowDetailState />
                            <TableRowDetail contentComponent={({ row }) => <MovieDetails row={row} />} />
                            <Toolbar />
                            <SearchPanel />
                            <PagingPanel />
                        </Grid>
                    </Paper>
                </Container>
            )}
        </>
    );
};

export default TrendingMovies;
