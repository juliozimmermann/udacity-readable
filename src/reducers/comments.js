import { ADD_UPDATE_COMMENT } from '../actions';

export const comments = (state = {}, action) => {
    switch (action.type) {
        case ADD_UPDATE_COMMENT:
            const { comment } = action;

            return {
                ...state,
                [comment.id]: comment
            };
    
        default:
            return state;
    }
}

export default comments;