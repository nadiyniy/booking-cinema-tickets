import { Box, Button, Checkbox, Container, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { nanoid } from 'nanoid';
import { LoadingButton } from '@mui/lab';

import PageLoader from './PageLoader';

import { makeRequest } from '../services/apiTodos';
import { Todo } from '../types/TodosTypes';

const Todos = () => {
    const [allTodos, setAllTodos] = useState<Todo[]>([]);
    const [newTodoValue, setNewTodoValue] = useState('');
    const [foundTodoValue, setFoundTodoValue] = useState('');
    const [foundTodos, setFoundTodos] = useState<Todo[]>([]);
    const [requestSearch, setRequestSearch] = useState(false);
    const [currentDeleteId, setCurrentDeleteId] = useState('');
    const [isLoadingAllTodos, setIsLoadingAllTodos] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLoadingCheck, setIsLoadingCheck] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);

    useEffect(() => {
        const allTodosQuery = `query allTodos { todos { data { title completed id user { id email name phone } } } }`;

        setIsLoadingAllTodos(true);

        makeRequest(allTodosQuery).then((res) => {
            setAllTodos(res.data.todos.data);
            setIsLoadingAllTodos(false);
        });
    }, []);

    const handleCreateTodo = (event: any) => {
        event.preventDefault();

        const createTodoRequest = `mutation CreateTodo { createTodo(input: { title: "${newTodoValue}", completed: false } ){ id title completed user { name } } }`;

        if (newTodoValue) {
            makeRequest(createTodoRequest).then((res) => {
                const duplicatedObject = { ...res.data.createTodo };
                duplicatedObject.id = nanoid();

                setAllTodos((prevTodos) => [duplicatedObject, ...prevTodos]);
                setNewTodoValue('');
            });
        }
    };

    const handleSearchTodo = (event: any) => {
        event.preventDefault();

        setIsLoadingSearch(true);

        const searchTodoQuery = `query SearchQuery { todos(options: { search: {q: "${foundTodoValue}"} }) { data { title completed id user { id email name phone } } } }`;

        if (foundTodoValue) {
            makeRequest(searchTodoQuery).then((res) => {
                const data = res.data.todos.data;

                if (!data.length) {
                    setRequestSearch((prev) => !prev);
                    setIsLoadingSearch(false);
                }
                setFoundTodos(data);
                setIsLoadingSearch(false);
            });
        }
    };

    const handleChangeStatus = (id: string, completed: boolean) => {
        const changeStatusQuery = `mutation UpdateTodo { updateTodo(id: "${id}", input: { completed: ${completed} }) { id completed } }`;

        setCurrentDeleteId(id);
        setIsLoadingCheck(true);

        makeRequest(changeStatusQuery).then((res) => {
            const updatedTodo = res.data.updateTodo;

            setAllTodos((prevTodos: any) =>
                prevTodos.map((todo: any) =>
                    todo.id === updatedTodo.id ? { ...todo, completed: updatedTodo.completed } : todo
                )
            );

            setFoundTodos((prevTodos: any) =>
                prevTodos.map((todo: any) =>
                    todo.id === updatedTodo.id ? { ...todo, completed: updatedTodo.completed } : todo
                )
            );

            setIsLoadingCheck(false);
        });
    };

    const handleDeleteTodo = (id: string) => {
        const deleteTodoRequest = `mutation DeleteTodo { deleteTodo(id: "${id}") }`;

        setCurrentDeleteId(id);
        setIsLoadingDelete(true);

        makeRequest(deleteTodoRequest).then(() => {
            setAllTodos((prevTodos) => prevTodos.filter((todo: any) => todo.id !== id));
            setFoundTodos((prevTodos: any) => prevTodos.filter((todo: any) => todo.id !== id));
            setIsLoadingDelete(false);
        });
    };

    const handleChangeValue = (e: any) => {
        if (!e.target.value) {
            setFoundTodos([]);
            setRequestSearch(false);
        }
        setFoundTodoValue(e.target.value);
    };

    const columns: GridColDef[] = [
        {
            field: 'favorite',
            headerName: '',
            width: 60,
            sortable: false,
            filterable: false,
            groupable: false,
            hideable: false,

            renderCell: (params) => (
                <Checkbox
                    checked={params.row.completed}
                    disabled={isLoadingCheck && currentDeleteId === params.row.id}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onChange={() => handleChangeStatus(params.row.id, !params.row.completed)}
                />
            )
        },
        {
            field: 'delete',
            headerName: '',
            width: 150,
            sortable: false,
            filterable: false,
            groupable: false,
            hideable: false,

            renderCell: (params) => (
                <LoadingButton
                    startIcon={<GridDeleteIcon />}
                    loadingPosition="start"
                    loading={isLoadingDelete && currentDeleteId === params.row.id}
                    variant="outlined"
                    onClick={() => handleDeleteTodo(params.row.id)}
                >
                    Delete
                </LoadingButton>
            )
        },
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'title', headerName: 'Todo', width: 300 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'email', headerName: 'Email', description: 'This is email', sortable: false, width: 160 }
    ];

    const rows = ((foundTodos.length && foundTodoValue && foundTodos) || allTodos).map((todo) => ({
        delete: 'delete',
        completed: todo.completed,
        id: todo.id,
        name: todo?.user?.name,
        title: todo?.title,
        phone: todo?.user?.phone,
        email: todo?.user?.email
    }));

    return (
        <Container>
            <Typography align="center" variant="h2">
                Todos GraphQL
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px', mb: '10px' }}>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px',
                        flexGrow: 1
                    }}
                    onSubmit={(event) => handleCreateTodo(event)}
                >
                    <TextField
                        label="New todo"
                        size="small"
                        value={newTodoValue}
                        onChange={(e) => setNewTodoValue(e.target.value)}
                        fullWidth
                        helperText="example 'go to home'"
                    />
                    <Button
                        disabled={!newTodoValue}
                        fullWidth
                        variant="contained"
                        startIcon={<AddIcon />}
                        type="submit"
                        sx={{ minWidth: '155px' }}
                    >
                        Create todo
                    </Button>
                </Box>
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
            </Box>
            <Paper>
                {isLoadingAllTodos || isLoadingSearch ? (
                    <PageLoader />
                ) : !foundTodos.length && foundTodoValue && requestSearch ? (
                    <Typography align="center" variant="h6">
                        No todos found.
                    </Typography>
                ) : (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 }
                            }
                        }}
                        pageSizeOptions={[5, 10, 20, 100]}
                        autoHeight
                        rowSelection={false}
                    />
                )}
            </Paper>
        </Container>
    );
};

export default Todos;
