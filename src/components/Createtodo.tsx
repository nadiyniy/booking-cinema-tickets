import { Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { nanoid } from 'nanoid';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

import { makeRequest } from '../services/apiTodos';
import { Todo } from '../types/TodosTypes';

type CreateTodoProps = {
    setAllTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const CreateTodo: React.FC<CreateTodoProps> = ({ setAllTodos }) => {
    const [newTodoValue, setNewTodoValue] = useState<string>('');
    const [isLoadingCreateTodo, setIsLoadingCreateTodo] = useState<boolean>(false);

    const handleCreateTodo = (event: any) => {
        event.preventDefault();
        setIsLoadingCreateTodo(true);
        const createTodoRequest = `mutation CreateTodo { createTodo(input: { title: "${newTodoValue}", completed: false } ){ id title completed user { name } } }`;

        if (newTodoValue) {
            makeRequest(createTodoRequest).then((res) => {
                const duplicatedObject = { ...res.data.createTodo };
                duplicatedObject.id = nanoid();

                setAllTodos((prevTodos) => [duplicatedObject, ...prevTodos]);
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
                onChange={(e) => setNewTodoValue(e.target.value)}
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
                sx={{ minWidth: '155px' }}
            >
                Create todo
            </LoadingButton>
        </Box>
    );
};

export default CreateTodo;
