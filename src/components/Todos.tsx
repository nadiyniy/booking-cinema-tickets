import { Box, Button, Checkbox, Container, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { nanoid } from 'nanoid';

import { makeRequest } from '../services/apiTodos';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Todos = () => {
    const [newTodoValue, setNewTodoValue] = useState('');
    const [foundTodoValue, setFoundTodoValue] = useState('');
    const [foundTodos, setFoundTodos] = useState([]);
    const [request, setRequest] = useState(false);
    const [allTodos, setAllTodos] = useState<
        { id: string; completed: boolean; user: { name: string; phone: string; email: string }; title: string }[]
    >([]);

    useEffect(() => {
        if (!foundTodoValue) {
            makeRequest(`query allTodos{
  todos{
  data{
    title
    completed
    
    id
    user{
      id
      email
      name
      phone
    }
  }
    }

}`).then((res) => setAllTodos(res.data.todos.data));
        }
    }, []);

    const handleCreateTodo = (event: any) => {
        event.preventDefault();
        if (newTodoValue) {
            makeRequest(`mutation CreateTodo{
  createTodo(input: {title: "${newTodoValue}", completed: false} ){
    id
    title
       
            completed
    user{
      name
    }
    
  }
  
}`).then((res) => {
                const duplicatedObject = { ...res.data.createTodo };
                duplicatedObject.id = nanoid();
                setAllTodos((prevTodos) => [duplicatedObject, ...prevTodos]);
                setNewTodoValue('');
            });
        }
    };

    const handleSearchTodo = (event: any) => {
        event.preventDefault();
        if (foundTodoValue) {
            makeRequest(`query SearchQuery{
                todos(options: {
                    search: {q: "${foundTodoValue}"}
                }){
                    data{
                        title
                        completed
                        id
                        user{
                            id
                            email
                            name
                            phone
                        }
                    }
                }
                
            }`).then((res) => {
                if (res.data.todos.data.length) {
                    setFoundTodos(res.data.todos.data);
                } else {
                    setRequest((prev) => !prev);
                }
            });
        }
    };

    const handleChangeStatus = (id: string, completed: boolean) => {
        makeRequest(`mutation UpdateTodo {
            updateTodo(id: "${id}", input: { completed: ${completed} }) {
                id
                completed
            }
        }`).then((res) => {
            const updatedTodo = res.data.updateTodo;
            setAllTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === updatedTodo.id ? { ...todo, completed: updatedTodo.completed } : todo
                )
            );
            setFoundTodos((prevTodos: any) =>
                prevTodos.map((todo: any) =>
                    todo.id === updatedTodo.id ? { ...todo, completed: updatedTodo.completed } : todo
                )
            );
        });
    };

    const handleDeleteTodo = (id: string) => {
        makeRequest(`mutation DeleteTodo{
  deleteTodo(id: "${id}")
}`).then(() => {
            setAllTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            setFoundTodos((prevTodos: any) => prevTodos.filter((todo: any) => todo.id !== id));
        });
    };

    const handleChangeValue = (e: any) => {
        if (!e.target.value) {
            setFoundTodos([]);
            setRequest(false);
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
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onChange={() => handleChangeStatus(params.row.id, !params.row.completed)}
                />
            )
        },
        {
            field: 'delete',
            headerName: '',
            width: 100,
            sortable: false,
            filterable: false,
            groupable: false,
            hideable: false,

            renderCell: (params) => (
                <Button variant="outlined" onClick={() => handleDeleteTodo(params.row.id)}>
                    Delete
                </Button>
            )
        },
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'title', headerName: 'Todo', width: 300 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'email', headerName: 'Email', description: 'This is email', sortable: false, width: 160 }
    ];

    const rows = ((foundTodos?.length && foundTodoValue && foundTodos) || allTodos).map((todo) => ({
        delete: 'delete',
        completed: todo.completed,
        id: todo.id,
        name: todo.user.name,
        title: todo.title,
        phone: todo.user.phone,
        email: todo.user.email
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
                    />
                    <Button
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
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<SearchIcon />}
                        type="submit"
                        sx={{ minWidth: '155px' }}
                    >
                        Search todo
                    </Button>
                </Box>
            </Box>
            <Paper>
                {!foundTodos.length && foundTodoValue && request ? (
                    <Typography align="center" variant="h6">
                        No tasks found.
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
