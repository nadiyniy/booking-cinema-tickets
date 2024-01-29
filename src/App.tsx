import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { SessionList, PageLoader, Layout, ModalSeatList, Home } from './components';

import { selectDate, selectIsLoading } from './redux/ducks/sessions.js';

function App() {
    const [open, setOpen] = useState(false);
    const isLoadingSessions = useSelector(selectIsLoading);
    const selectedDate = useSelector(selectDate);

    const sessionList = isLoadingSessions ? (
        <PageLoader />
    ) : (
        <SessionList selectedDate={selectedDate} setOpen={setOpen} />
    );

    const navigate = useNavigate();

    useEffect(() => {
        !selectedDate && navigate('/');
    }, [selectedDate]);

    return (
        <Routes>
            <Route path="/" element={<Layout selectedDate={selectedDate} />}>
                <Route index element={<Home />} />
                <Route path="/session_list" element={sessionList} />
                <Route path="/session_details" element={<ModalSeatList open={open} setOpen={setOpen} />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
