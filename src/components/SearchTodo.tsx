import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { makeRequest } from '../services/apiTodos';
import { BoxSearchTodo } from '../styled/SearchTodoStyled';
import { SearchTodoProps } from '../types';

const SearchTodo = ({
    setFoundTodoValue,
    setRequestSearch,
    setIsLoadingSearch,
    foundTodoValue,
    setFoundTodos,
    isLoadingSearch
}: SearchTodoProps) => {
    const handleSearchTodo = (event: React.FormEvent<HTMLFormElement>) => {
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

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!event.target.value) {
            setFoundTodos([]);
            setRequestSearch(false);
        }
        setFoundTodoValue(event.target.value);
    };

    return (
        <form onSubmit={(event) => handleSearchTodo(event)}>
            <BoxSearchTodo>
                <TextField
                    fullWidth
                    label="Search todo"
                    size="small"
                    value={foundTodoValue}
                    onChange={(event) => handleChangeValue(event)}
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
                >
                    Search todo
                </LoadingButton>
            </BoxSearchTodo>
        </form>
    );
};

export default SearchTodo;
