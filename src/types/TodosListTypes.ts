import { TodoProps } from './TodosTypes';

export type TodosListProps = {
    requestSearch: string;
    isLoadingAllTodos: boolean;
    foundTodos: string[];
    allTodos: TodoProps[];
    setFoundTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
    isLoadingSearch: boolean;
    foundTodoValue: string;
    setAllTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
    setIsLoadingAllTodos: (value: boolean) => void;
};
