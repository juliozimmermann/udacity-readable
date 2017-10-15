import { combineReducers } from 'redux';
//import { DATA_SORT, ADD_CATEGORY, ADD_UPDATE_POST, ADD_UPDATE_COMMENT } from '../actions';

import { categories } from './categories';
import { posts } from './posts';
import { comments } from './comments';
import { dataSort } from './dataSort';

export default combineReducers({ categories, posts, comments, dataSort });