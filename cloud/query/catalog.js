import axios from 'axios';
import { useQuery } from 'react-query';

///// manage local storage holding current organization id

console.log('fixtures');

const isUUID = value => {
    const reUUID = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[4][0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-ff]{3}-[0-9A-Fa-f]{12}$/;
    return !!reUUID.test(String(value).toLowerCase());
};

const getFixture = id => async () => {
    if (!isUUID(id)) return { reference: 'Invalid UUID' };
    const response = await axios.get(`/catalog/fixture/${id}`);
    return response.data;
};

export const useFixture = id => useQuery(['catalog', 'fixture', id], getFixture(id));

const getDrivers = async () => {
    const { data } = await axios.get('/catalog/drivers');
    return data;
};

export const useDrivers = () => useQuery(['catalog', 'drivers'], getDrivers);
