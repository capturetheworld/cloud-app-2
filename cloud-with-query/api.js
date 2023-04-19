export const setScene = async id => {
    try {
        console.log(`setting scene to ${id}`);
        await fetch(`/circuit/scene/${id}`, {
            method: 'PUT'
        });
    }
    catch (error) {
        console.error(`error setting scene ${id}: ${error}`);
    }
};
