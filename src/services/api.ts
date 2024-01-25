import axios from 'axios';

axios.defaults.baseURL = 'https://demo9384132.mockable.io/';

export const getDate = async () => (await axios.get('date')).data;

export const getSessions = async () => (await axios.get('sessions')).data;

export const getSessionDetails = async () => (await axios.get('session-details')).data;

export const getReservationsSeat = async () => (await axios.post('reservations-seat')).data;
