import { Container, Typography } from '@mui/material';
import { useState } from 'react';

import { SearchTodo, TodosList } from '.';

import { TodoProps } from '../types';
import { BoxTodos } from '../styled/TodosStyled';
import CreateTodo from './CreateTodo';

const Todos = () => {
    const [allTodos, setAllTodos] = useState<TodoProps[]>([]);
    const [foundTodoValue, setFoundTodoValue] = useState('');
    const [foundTodos, setFoundTodos] = useState<TodoProps[]>([]);
    const [requestSearch, setRequestSearch] = useState(false);
    const [isLoadingAllTodos, setIsLoadingAllTodos] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);

    return (
        <Container>
            <Typography align="center" variant="h2">
                Todos GraphQL
            </Typography>
            <BoxTodos>
                <CreateTodo setAllTodos={setAllTodos} />
                <SearchTodo
                    setFoundTodoValue={setFoundTodoValue}
                    setRequestSearch={setRequestSearch}
                    setIsLoadingSearch={setIsLoadingSearch}
                    foundTodoValue={foundTodoValue}
                    setFoundTodos={setFoundTodos}
                    isLoadingSearch={isLoadingSearch}
                />
            </BoxTodos>
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
