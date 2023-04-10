export * from './circuits';
export * from './devices';
export * from './fixtures';

import { updateCircuits } from './circuits';
import { updateDevices } from './devices';
import { updateFixtures } from './fixtures';

import io from 'socket.io-client';

import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity
        }
    }
});

const socket = io.connect('/');
socket.on('connect', () => {
    console.log('socket connected');
});

const _updateDispatches = {
    Circuit: updateCircuits,
    Device: updateDevices,
    Fixture: updateFixtures
};

socket.on('update', msg => {
    // console.log('notify update', msg);
    const dispatchFn = _updateDispatches[msg.key];
    if (dispatchFn) {
        dispatchFn(msg.value);
    } else {
        console.warn('Unknown event update:', msg);
    }
});

function Foo() { }

export default Foo;
