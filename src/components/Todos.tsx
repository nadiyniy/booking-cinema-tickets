import { Container, Typography } from '@mui/material';
import { useState } from 'react';

import { CreateTodo, SearchTodo, TodosList } from '.';

import { Todo } from '../types/TodosTypes';
import { BoxTodos } from '../styled/TodosStyled';

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
