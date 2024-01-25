export type SessionListProps = {
    selectedDate: string;
    sessions: string[];
    handleSessionClick: (session: string) => void;
};
