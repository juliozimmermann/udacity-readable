import { DATA_SORT } from '../actions';

export const dataSort = (state = {}, action) => {
    switch(action.type) {
        case DATA_SORT:
            const { feature, field, order } = action; 

            return {
                ...state,
                [feature]: {
                    field: field,
                    order: order
                }
            };

        default:
            return state;
    }
}

export default dataSort;