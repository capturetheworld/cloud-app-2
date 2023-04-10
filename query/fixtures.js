import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
import { queryClient } from '.';

///// manage local storage holding current organization id

console.log('fixtures');

const getFixtures = async () => {
    const response = await axios.get('/fixture');
    return response.data;
};

export const useFixtures = () =>
    useQuery(
        'fixtures',
        getFixtures,
        {
            initialData: [],
            staleTime: 0
        }
    );

const addFixture = fixture =>
    axios.post('/fixture', fixture);

const updateFixture = fixture =>
    fixture.remove
        ? axios.delete(`/fixture/${fixture.id}`)
        : axios.put('/fixture', fixture);

export const useUpsertFixture = (editing) => {
    return useMutation(editing ? updateFixture : addFixture, {
        onSuccess: () => queryClient.invalidateQueries('fixtures')
    });
};

export const updateFixtures = data => {
    console.log('socket fixture update:', data);
    // eslint-disable-next-line no-undef
    queryClient.invalidateQueries('fixtures');
};

// eslint-disable-next-line no-unused-vars
export const removeFixtures = data => {
    // eslint-disable-next-line no-undef
    // window.queryClient.setQueryData()
    // window.queryClient.invalidateQueries('circuits');
};
