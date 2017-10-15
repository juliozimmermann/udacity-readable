import { ADD_CATEGORY } from '../actions';

export const categories = (state = {}, action) => {
    switch (action.type) {
        case ADD_CATEGORY: 
            const { category } = action;

            return {
                ...state,
                [category.name]: {
                    ...category
                }
            };

        default:
            return state;
    }
}

export default categories;
