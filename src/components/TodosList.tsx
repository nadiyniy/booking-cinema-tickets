import { Paper, Checkbox, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';

import { PageLoader } from '.';

import { makeRequest } from '../services/apiTodos';

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
}: any) => {
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
            setAllTodos((prevTodos: any) => prevTodos.filter((todo: any) => todo.id !== id));
            setFoundTodos((prevTodos: any) => prevTodos.filter((todo: any) => todo.id !== id));
            setIsLoadingDelete(false);
        });
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

    const rows = ((foundTodos.length && foundTodoValue && foundTodos) || allTodos).map((todo: any) => ({
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
