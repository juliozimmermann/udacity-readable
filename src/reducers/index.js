import { combineReducers } from 'redux';
import { DATA_SORT, ADD_CATEGORY, ADD_UPDATE_POST, ADD_UPDATE_COMMENT } from '../actions';

function posts(state = {}, action) {
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

function comments(state = {}, action) {
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

function categories(state = {}, action) {
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

function dataSort(state = {}, action) {
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

export default combineReducers({ categories, posts, comments, dataSort });