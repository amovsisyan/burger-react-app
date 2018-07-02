import {types} from "./actions";

const initialState = {
    init: false
};

const initTypes = (state, payload) => {
    return {
        ...state,
        init: payload.init
    }
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.INIT:
            return initTypes(state, action.payload);
        default:
            return state;
    }
};
export default reducer;