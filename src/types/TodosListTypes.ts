import { TodoProps } from '.';

export type TodosListProps = {
    requestSearch: boolean;
    isLoadingAllTodos: boolean;
    foundTodos: TodoProps[];
    allTodos: TodoProps[];
    setFoundTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
    isLoadingSearch: boolean;
    foundTodoValue: string;
    setAllTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
    setIsLoadingAllTodos: (value: boolean) => void;
};
