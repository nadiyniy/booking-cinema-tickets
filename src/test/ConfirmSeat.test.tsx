import { render, screen, cleanup } from '@testing-library/react';

import ConfirmSeat from '../components/ConfirmSeat';

afterEach(() => {
    cleanup();
});

test('should render App component', () => {
    render(
        <ConfirmSeat
            selectedSeat={''}
            error={null}
            onReservedSeat={function (): void {
                throw new Error('Function not implemented.');
            }}
        />
    );
    const confirmSeatElement = screen.getByTestId('ConfirmSeat-1');
    expect(confirmSeatElement).toBeInTheDocument();
    expect(confirmSeatElement).toHaveTextContent('chose seat');
});
