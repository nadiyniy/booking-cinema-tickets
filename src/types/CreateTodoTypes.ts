import { TodoProps } from '.';

export type CreateTodoProps = {
    setAllTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
};
