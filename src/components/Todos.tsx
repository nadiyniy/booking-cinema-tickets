import { Box, Button, Checkbox, Container, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { nanoid } from 'nanoid';

import { makeRequest } from '../services/apiTodos';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
            <Checkbox checked={params.row.completed} {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
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
            <Button variant="outlined" onClick={() => console.log(params, 123)}>
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

const Todos = () => {
    const [newTodoValue, setNewTodoValue] = useState('');
    const [foundTodo, setFoundTodo] = useState('');
    const [allTodos, setAllTodos] = useState<
        { id: string; completed: boolean; user: { name: string; phone: string; email: string }; title: string }[]
    >([]);
    const rows = allTodos.map((todo) => ({
        delete: 'delete',
        completed: todo.completed,
        id: todo.id,
        name: todo.user.name,
        title: todo.title,
        phone: todo.user.phone,
        email: todo.user.email
    }));

    useEffect(() => {
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
                console.log(duplicatedObject);
                setAllTodos((prevTodos) => [duplicatedObject, ...prevTodos]);
                setNewTodoValue('');
            });
        }
    };

    const handleSearchTodo = (event: any) => {
        event.preventDefault();
        console.log('знайдене Todo:', foundTodo);
        setFoundTodo('');
    };

    <Box component="form" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <TextField label="New todo" size="small" />
        <Button variant="contained" startIcon={<AddIcon />}>
            Create todo
        </Button>
    </Box>;
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
                        value={foundTodo}
                        onChange={(e) => setFoundTodo(e.target.value)}
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
                />
            </Paper>
        </Container>
    );
};

export default Todos;
