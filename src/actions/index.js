export const INITIALIZE_POSTS = 'INITIALIZE_POSTS';
export const INITIALIZE_COMMENTS = 'INITIALIZE_COMMENTS';

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_UPDATE_POST = 'ADD_UPDATE_POST';
export const ADD_UPDATE_COMMENT = 'ADD_UPDATE_COMMENT';
//export const UP_VOTE = 'UP_VOTE';
//export const DOWN_VOTE = 'DOWN_VOTE';
export const DATA_SORT = 'DATA_SORT';


//const CATEGORY = { name: null, path: null };
//const INTERACTION_BASE = { id: null, parentId: null, timestamp: null, body: null, author: null, voteScore: null, deleted: null };
//const POST = { ...INTERACTION_BASE, title: null, category: null }
//const COMMENT = { ...INTERACTION_BASE, parentDeleted: null } 


export function addUpdatePost(POST) {
    return {
        type: ADD_UPDATE_POST,
        post: POST
    }
}

export function addUpdateComment(COMMENT) {
    return {
        type: ADD_UPDATE_COMMENT,
        comment: COMMENT
    }
}

export function addCategory(CATEGORY) {
    return {
        type: ADD_CATEGORY,
        category: CATEGORY
    }
}

export function dataSort(feature, field, order) {
    return {
        type: DATA_SORT,
        feature,
        field,
        order
    }
}