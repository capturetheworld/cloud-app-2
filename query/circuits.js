import axios from 'axios';
import { useQuery } from 'react-query';
import { queryClient } from '.';

///// manage local storage holding current organization id

const getCircuits = async () => {
    try {
        const { data } = await axios.get('/circuit/list');
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const useCircuits = () =>
    useQuery(
        'circuits',
        getCircuits,
        {
            initialData: []
        }
    );

export const updateCircuits = data => {
    console.log('socket circuit update:', data);
    // eslint-disable-next-line no-undef
    queryClient.invalidateQueries('circuits');
};

// eslint-disable-next-line no-unused-vars
export const removeCircuits = data => {
    // eslint-disable-next-line no-undef
    // window.queryClient.setQueryData()
    // window.queryClient.invalidateQueries('circuits');
};
