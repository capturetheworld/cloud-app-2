import axios from 'axios';
import { useQuery, useMutation } from 'react-query';
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

export const useSetCircuitLevel = (name) => {
    return useMutation({
        mutationFn: setCircuitLevel(name),
        onMutate: async newlevel => {

            await queryClient.cancelQueries({ queryKey: ['circuits'] });

            const previousCircuits = await getCircuits();
            let otherCircuits = [];
            let updatedCircuit = previousCircuits.find(c => c.name === name)
            console.log("UPDATED CIRCUIT IS")
            console.log(previousCircuits);
            for (let circuit in previousCircuits) {
                if (circuit.name !== name) {
                    otherCircuits.push(circuit);
                }
            }

            updatedCircuit.state.level = newlevel / 100 * 255;

            queryClient.setQueryData(['circuits'], [updatedCircuit, ...otherCircuits]);
            return { previousCircuits };
        },
        onSuccess: () => queryClient.invalidateQueries(['circuits'])
    });
};

const setCircuitLevel = name => async level => {
    console.log("setCircuitLevel", level)
    return axios.put('/circuit/level', { name, level: level * 255 / 100 });
}

export const useCircuits = () =>
    useQuery(
        ['circuits'],
        getCircuits,
        {
            initialData: []
        }
    );

export const updateCircuits = (msg) => {
    // eslint-disable-next-line no-undef
    // console.log("CIRCUIT", msg);
    queryClient.invalidateQueries(['circuits']);
};

// eslint-disable-next-line no-unused-vars
export const removeCircuits = data => {
    // eslint-disable-next-line no-undef
    // window.queryClient.setQueryData()
    // window.queryClient.invalidateQueries('circuits');
};
