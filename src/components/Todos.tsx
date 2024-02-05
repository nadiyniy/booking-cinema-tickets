import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';

import CreateTodo from './Createtodo';
import SearchTodo from './SearchTodo';
import TodosList from './TodosList';

import { Todo } from '../types/TodosTypes';

const Todos = () => {
    const [allTodos, setAllTodos] = useState<Todo[]>([]);
    const [foundTodoValue, setFoundTodoValue] = useState('');
    const [foundTodos, setFoundTodos] = useState<Todo[]>([]);
    const [requestSearch, setRequestSearch] = useState(false);
    const [isLoadingAllTodos, setIsLoadingAllTodos] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);

    return (
        <Container>
            <Typography align="center" variant="h2">
                Todos GraphQL
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px', mb: '10px' }}>
                <CreateTodo setAllTodos={setAllTodos} />
                <SearchTodo
                    setFoundTodoValue={setFoundTodoValue}
                    setRequestSearch={setRequestSearch}
                    setIsLoadingSearch={setIsLoadingSearch}
                    foundTodoValue={foundTodoValue}
                    setFoundTodos={setFoundTodos}
                    isLoadingSearch={isLoadingSearch}
                />
            </Box>
            <TodosList
                setIsLoadingAllTodos={setIsLoadingAllTodos}
                foundTodoValue={foundTodoValue}
                setFoundTodos={setFoundTodos}
                allTodos={allTodos}
                setAllTodos={setAllTodos}
                foundTodos={foundTodos}
                requestSearch={requestSearch}
                isLoadingAllTodos={isLoadingAllTodos}
                isLoadingSearch={isLoadingSearch}
            />
        </Container>
    );
};

export default Todos;
