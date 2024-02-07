import { FormEvent, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { nanoid } from 'nanoid';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { makeRequest } from '../services/apiTodos';

const CreateTodo = ({ setAllTodos }: any) => {
    const [newTodoValue, setNewTodoValue] = useState<string>('');
    const [isLoadingCreateTodo, setIsLoadingCreateTodo] = useState(false);

    const handleCreateTodo = (event: FormEvent) => {
        event.preventDefault();
        setIsLoadingCreateTodo(true);
        const createTodoRequest = `mutation CreateTodo { createTodo(input: { title: "${newTodoValue}", completed: false } ){ id title completed user { name } } }`;

        if (newTodoValue) {
            makeRequest(createTodoRequest).then((res) => {
                const duplicatedObject = { ...res.data.createTodo };
                duplicatedObject.id = nanoid();

                setAllTodos((prevTodos: any) => [duplicatedObject, ...prevTodos]);
                setNewTodoValue('');
                setIsLoadingCreateTodo(false);
            });
        }
    };

    return (
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
                onChange={(event) => setNewTodoValue(event.target.value)}
                fullWidth
                helperText="example 'go to home'"
            />
            <LoadingButton
                disabled={!newTodoValue}
                loadingPosition="start"
                loading={isLoadingCreateTodo}
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                type="submit"
            >
                Create todo
            </LoadingButton>
        </Box>
    );
};

export default CreateTodo;
