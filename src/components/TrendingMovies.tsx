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
import { MovieRowProps } from '../types';

interface HighlightedCellProps {
    value: number;
    style: React.CSSProperties;
    restProps: Table.DataCellProps;
}

const HighlightedCell: React.FC<HighlightedCellProps> = ({ value, style, restProps }) => (
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

interface RowDetailProps {
    row: MovieRowProps;
}

const RowDetail: React.FC<RowDetailProps> = ({ row }) => {
    return <MovieDetails row={row} />;
};

const TrendingMovies = () => {
    const [rows, setRows] = useState<MovieRowProps[]>([]);
    const [columns] = useState([
        { name: 'vote_average', title: 'Vote average (is sortable)' },
        { name: 'title', title: 'Title' },
        { name: 'poster', title: 'Poster' },
        { name: 'id', title: 'ID' }
    ]);
    const [tableColumnExtensions] = useState<Table.ColumnExtension[]>([
        { columnName: 'poster', align: 'right' },
        { columnName: 'vote_average', wordWrapEnabled: true }
    ]);
    const [sortingStateColumnExtensions] = useState([
        { columnName: 'title', sortingEnabled: false },
        { columnName: 'poster', sortingEnabled: false },
        { columnName: 'vote_average', sortingEnabled: true }
    ]);
    const [sorting, setSorting] = useState<Sorting[]>([]);

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

        setRows(getRows || []);
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
                                columnExtensions={sortingStateColumnExtensions}
                            />
                            <IntegratedSorting />
                            <Table cellComponent={Cell} columnExtensions={tableColumnExtensions} />
                            <TableHeaderRow showSortingControls />
                            <RowDetailState />
                            <TableRowDetail contentComponent={RowDetail} />
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
