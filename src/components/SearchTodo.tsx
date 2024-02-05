import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';

import { makeRequest } from '../services/apiTodos';

const SearchTodo = ({
    setFoundTodoValue,
    setRequestSearch,
    setIsLoadingSearch,
    foundTodoValue,
    setFoundTodos,
    isLoadingSearch
}: any) => {
    const handleSearchTodo = (event: any) => {
        event.preventDefault();

        setIsLoadingSearch(true);

        const searchTodoQuery = `query SearchQuery { todos(options: { search: {q: "${foundTodoValue}"} }) { data { title completed id user { id email name phone } } } }`;

        if (foundTodoValue) {
            makeRequest(searchTodoQuery).then((res) => {
                const data = res.data.todos.data;

                if (!data.length) {
                    setRequestSearch((prev: boolean) => !prev);
                    setIsLoadingSearch(false);
                }
                setFoundTodos(data);
                setIsLoadingSearch(false);
            });
        }
    };
    const handleChangeValue = (e: any) => {
        if (!e.target.value) {
            setFoundTodos([]);
            setRequestSearch(false);
        }
        setFoundTodoValue(e.target.value);
    };
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
            }}
            onSubmit={(event) => handleSearchTodo(event)}
        >
            <TextField
                fullWidth
                label="Search todo"
                size="small"
                value={foundTodoValue}
                onChange={(e) => handleChangeValue(e)}
                helperText="example 'dolor'"
            />
            <LoadingButton
                disabled={!foundTodoValue}
                loading={isLoadingSearch}
                loadingPosition="start"
                fullWidth
                variant="contained"
                startIcon={<SearchIcon />}
                type="submit"
                sx={{ minWidth: '155px' }}
            >
                Search todo
            </LoadingButton>
        </Box>
    );
};

export default SearchTodo;
