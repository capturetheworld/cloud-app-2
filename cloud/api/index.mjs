import axios from 'axios'
import io from 'socket.io-client'

let contexts = {} //storage list of storage
let globalOffset = 0

const _testMode = true;

if (_testMode) {
    console.warn('Testmode is turned on in the api! This means the data may not reflect real data.')
}

/**
 *
 * {
 * circuit1 : {callback, slope, targetLevel, targetTime, currentLevel}
 * circuit2 : {callback, slope, targetLevel, targetTime, currentLevel}
 * }
 */

//runner function
const run = () => {
    for (const context of Object.values(contexts)) {
        // console.log('runner is running', context.slope);
        if (!!context.slope || context.slope === 0) {
            // console.log('runner is running');
            const now = Date.now()
            const lastLevel = context.currentLevel
            if (now >= context.targetTime) {
                context.currentLevel = context.targetLevel
                delete context.slope
            } else {
                context.currentLevel = context.l0 + context.slope * (now - context.t0)

                // console.log("checkpoint", context.l0, context.slope, (now - context.t0));
            }
            if (true || context.currentLevel !== lastLevel) {
                context.callback(context.currentLevel)
            }
        }
    }

    if (_testMode) {
        for (const name in contexts) {
            const context = contexts[name];
            if (!context.testModeData) {
                console.log('initialize testModeData', context);
                context.testModeData = {
                    holdUntil: 0
                }
            }
            const { holdUntil } = context.testModeData;
            const { targetLevel } = context;
            const now = Date.now();

            if (now > holdUntil) {
                console.log('set next transition', holdUntil);
                const nextLevel = targetLevel ? 0 : 255;
                handleUpdate({
                    key: 'Circuit',
                    value: {
                        name,
                        state: {
                            level: nextLevel,
                            levelTs: now + 5000
                        }
                    }
                })
                context.testModeData.holdUntil = now + 7000;
            }
        }
    }
}


export const subscribeValue = (name, callback) => {
    contexts[name] = { ...contexts[name], callback, currentLevel: 0 }
}

export const sendValue = (name, level) => {
    axios.put('/circuit/level', { name, level: (level * 255) / 100 })
    if (_testMode) {
        contexts[name].testModeData.holdUntil = Date.now() + 10000;
    }
}

export const setScene = async (id) => {
    try {
        console.log(`setting scene to ${id}`)
        await fetch(`/circuit/scene/${id}`, {
            method: 'PUT',
        })
    } catch (error) {
        console.error(`error setting scene ${id}: ${error}`)
    }
}

const socket = io.connect('localhost:3000')
socket.on('connect', () => {
    console.log('socket connected')
})

const handleUpdate = (msg) => {
    if (msg.key === 'Circuit') {
        console.log('Circuit update', msg.value);
        const circuit = msg.value
        const name = circuit.name
        const context = contexts[name]
        const offset = globalOffset
        if (!context) return;

        const t0 = Date.now()
        const l0 = context.currentLevel
        const targetLevel = circuit.state.level
        const targetTime = circuit.state.levelTs - offset

        const slope = (targetLevel - l0) / Math.max(targetTime - t0, 1)
        console.log('LEVEL', targetLevel - l0, 'TIME', targetTime - t0)
        console.log('set context', context)
        contexts[name] = {
            ...context,
            targetLevel,
            targetTime,
            slope,
            t0,
            l0
        }
        console.log('after set', contexts[name]);
    }
}

export const _f_handleUpdate = handleUpdate

socket.on('update', handleUpdate)

const syncTime = async () => {
    try {
        const { data: serverTime } = await axios.get('/info/timestamp')
        offset = serverTime - Date.now()
        // console.log('OFFSET IS', offset);
    } catch {
        // console.error("there is a problem syncing time")
    }

    setTimeout(syncTime, 1000)
}

const start = () => {
    syncTime()
    setInterval(run, 100)
}

start()

export default start
