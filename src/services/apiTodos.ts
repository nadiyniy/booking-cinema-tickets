import axios from 'axios';

const todosApi = axios.create({
    baseURL: 'https://graphqlzero.almansi.me/api'
});

export const makeRequest = async (query: string) => {
    try {
        const { data } = await todosApi.post('', {
            query: query
        });
        return data;
    } catch (error) {
        console.error('GraphQL request failed:', error);
    }
};
