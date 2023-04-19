import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { queryClient } from '.';

///// manage local storage holding current organization id

const getDevices = async () => {
    try {
        const { data } = await axios.get('/device/list');
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const useDevices = () =>
    useQuery(
        ['devices'],
        getDevices,
        {
            initialData: [],
            staleTime: 0
        }
    );

const getDeviceConfig = id => async () => {
    const response = await axios.get(`/device/deviceConfig/${id}`);
    return response.data;
};

export const useDeviceConfig = id =>
    useQuery(
        ['deviceConfig', id],
        getDeviceConfig(id),
        {
            initialData: {},
            staleTime: 0
        }
    );

const updateDeviceConfig = id => async config =>
    axios.post('/device/deviceConfig', {
        id,
        config
    });

export const useUpdateDeviceConfig = id => {
    return useMutation(updateDeviceConfig(id), {
        onSuccess: () => queryClient.invalidateQueries(['deviceConfig', id])
    });
};

const resetDevice = id => async () =>
    axios.put('/device/reset', { id });

export const useResetDevice = id =>
    useMutation(resetDevice(id), {
        onSuccess: () => queryClient.invalidateQueries(['deviceConfig', id])    // TODO only invalidate this device please
    });

export const updateDevices = data => {
    // console.log('socket device update:', data);
    // eslint-disable-next-line no-undef
    queryClient.invalidateQueries(['devices']);
};

// eslint-disable-next-line no-unused-vars
export const removeDevices = data => {
    // eslint-disable-next-line no-undef
    // window.queryClient.setQueryData()
    // window.queryClient.invalidateQueries('circuits');
};
