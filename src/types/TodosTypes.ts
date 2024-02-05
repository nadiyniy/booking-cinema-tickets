export type Todo = {
    id?: string;
    title?: string;
    completed?: boolean;
    user?: {
        phone?: string;
        name?: string;
        email?: string;
    };
};
