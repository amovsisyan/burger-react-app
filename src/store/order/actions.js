export const types = {
    INIT: 'order.INIT'
};

export const initOrders = () => {
    return {
        type: types.INIT,
        payload: {
            init: true
        }
    }
};