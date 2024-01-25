export type SeatListProps = {
    seats: string[];
    reservedSeat: string[];
    selectedSeat: string;
    handleSeatClick: (seat: string) => void;
};
