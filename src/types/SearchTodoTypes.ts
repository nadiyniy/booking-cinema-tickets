import { TodoProps } from '.';

export type SearchTodoProps = {
    setFoundTodoValue: React.Dispatch<React.SetStateAction<string>>;
    setRequestSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoadingSearch: React.Dispatch<React.SetStateAction<boolean>>;
    setFoundTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
    foundTodoValue: string;
    isLoadingSearch: boolean;
};
