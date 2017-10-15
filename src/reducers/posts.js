import { ADD_UPDATE_POST } from '../actions';

export const posts = (state = {}, action) => {
    switch (action.type) {
        case ADD_UPDATE_POST:
            const { post } = action;
            return {
                ...state,
                [post.id]: post
            }
        default: 
            return state;
    }
}

export default posts;