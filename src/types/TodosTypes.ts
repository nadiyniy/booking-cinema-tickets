export type TodoProps = {
    id?: string;
    title?: string;
    completed?: boolean;
    user?: {
        phone?: string;
        name?: string;
        email?: string;
    };
};
