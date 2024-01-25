export type ModalSeatListProps = {
    reservedSeat: string[];
    selectedSeat: string;
    isLoading: boolean;
    selectedSession: string;
    seats: string[];
    open: boolean;
    errorSeat: string | null;
    confirmSeat: string;
    handleSeatClick: (seat: string) => void;
    onReservedSeat: () => void;
    handleClose: () => void;
};
