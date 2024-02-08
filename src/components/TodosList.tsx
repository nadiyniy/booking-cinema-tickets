import { useEffect, useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Checkbox, Typography } from '@mui/material';
import { GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';

import { PageLoader } from '.';

import { makeRequest } from '../services/apiTodos';
import { TodoProps, TodosListProps } from '../types';

const TodosList = ({
    requestSearch,
    isLoadingAllTodos,
    foundTodos,
    allTodos,
    setFoundTodos,
    isLoadingSearch,
    foundTodoValue,
    setAllTodos,
    setIsLoadingAllTodos
}: TodosListProps) => {
    const [currentDeleteId, setCurrentDeleteId] = useState('');
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [isLoadingCheck, setIsLoadingCheck] = useState(false);

    useEffect(() => {
        const allTodosQuery = `query allTodos { todos { data { title completed id user { id email name phone } } } }`;

        setIsLoadingAllTodos(true);

        makeRequest(allTodosQuery).then((res) => {
            setAllTodos(res.data.todos.data);
            setIsLoadingAllTodos(false);
        });
    }, []);

    const handleDeleteTodo = (id: string) => {
        const deleteTodoRequest = `mutation DeleteTodo { deleteTodo(id: "${id}") }`;

        setCurrentDeleteId(id);
        setIsLoadingDelete(true);

        makeRequest(deleteTodoRequest).then(() => {
            setAllTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            setFoundTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
            setIsLoadingDelete(false);
        });
    };

    const handleChangeStatus = (id: string, completed: boolean) => {
        const changeStatusQuery = `mutation ChangeStatus { updateTodo(id: "${id}", input: {completed: ${completed}}) {id completed} }`;

        setCurrentDeleteId(id);
        setIsLoadingCheck(true);

        makeRequest(changeStatusQuery).then((res) => {
            const updatedTodo = res.data.updateTodo;

            setAllTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === updatedTodo.id ? { ...todo, completed: updatedTodo.completed } : todo
                )
            );

            setFoundTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === updatedTodo.id ? { ...todo, completed: updatedTodo.completed } : todo
                )
            );

            setIsLoadingCheck(false);
        });
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

    const rows = ((foundTodos.length && foundTodoValue && foundTodos) || allTodos).map((todo: TodoProps) => ({
        delete: 'delete',
        completed: todo.completed,
        id: todo.id,
        name: todo?.user?.name,
        title: todo?.title,
        phone: todo?.user?.phone,
        email: todo?.user?.email
    }));
    return (
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
    );
};

export default TodosList;
