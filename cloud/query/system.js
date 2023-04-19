import axios from 'axios';
import { useQuery } from 'react-query';
import { queryClient } from '.';

///// manage local storage holding current organization id

console.log('system');

const getStatus = () => async () => {
    const response = await axios.get('/cloud/status');
    return response.data;
};

export const useCloudStatus = () => useQuery(['cloudStatus'], getStatus());

export const updateStatus = data => {
    console.log('status update:', data);
    // eslint-disable-next-line no-undef
    queryClient.invalidateQueries(['cloudStatus']);
};

