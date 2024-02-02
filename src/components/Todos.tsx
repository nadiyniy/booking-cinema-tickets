import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const Todos = () => {
    const [newTodo, setNewTodo] = useState('');
    const [foundTodo, setFoundTodo] = useState('');

    const handleCreateTodo = (event: any) => {
        event.preventDefault();
        console.log('створене todo:', newTodo);
        setNewTodo('');
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
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
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
                <ul>
                    <li>12</li>
                    <li>12</li>
                    <li>12</li>
                    <li>12</li>
                    <li>12</li>
                    <li>12</li>
                </ul>
            </Paper>
        </Container>
    );
};

export default Todos;
