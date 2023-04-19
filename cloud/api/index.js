export * from './circuits';
export * from './devices';
export * from './catalog';
export * from './system';

export * from 'react-query/devtools';
export * from 'react-query';

import { updateCircuits } from './circuits';
import { updateDevices } from './devices';
import { updateStatus } from './system';

import io from 'socket.io-client';

import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0
        }
    }
});

console.log('starting socket...');

const socket = io.connect('/');
socket.on('connect', () => {
    console.log('socket connected');
});

const _updateDispatches = {
    Circuit: updateCircuits,
    Device: updateDevices,
    Status: updateStatus
};

socket.on('update', msg => {
    // console.log('notify update', msg);
    const dispatchFn = _updateDispatches[msg.key];
    if (dispatchFn) {
        dispatchFn(msg.value);
    } else {
        // console.warn('Unknown event update:', msg);
    }
});
