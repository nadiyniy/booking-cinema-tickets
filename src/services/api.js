import axios from 'axios';

axios.defaults.baseURL = 'http://demo9384132.mockable.io/';

export const getDate = async () => {
    const { data } = await axios.get('date');
    return data;
};

export const getSessions = async () => {
    const { data } = await axios.get('sessions');
    return data;
};

export const getSessionDetails = async () => {
    const { data } = await axios.get('session-details');
    return data;
};

export const getReservationsSeat = async (body) => {
    const { data } = await axios.post('reservations-seat', { body });
    return data;
};
