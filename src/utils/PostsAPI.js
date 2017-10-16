const url = 'http://localhost:5001'

const AUTHORIZATION = { 'Authorization': 'yes' };
const HEADERS = { 
    headers : { 
        ...AUTHORIZATION,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    } 
};
const REQUEST_BASE = { ...HEADERS };

const GET = { ...REQUEST_BASE };
const POST = { ...REQUEST_BASE, 'method': 'POST' };
const PUT = { ...REQUEST_BASE, 'method': 'PUT' };
const DELETE = { ...REQUEST_BASE, 'method': 'DELETE' };

const toJson = (res) => res.json();

export const getCategories = () => fetch(`${url}/categories`, GET).then(toJson);

export const getPosts = (category = '', postId = '') => {

    if (typeof category === 'string' &&
        category.length > 0) {
        category = `/${category}`;
    } else {
        category = '';
    }

    if (typeof postId === 'string' &&
        postId.length > 0) {
        postId = `/${postId}`;
    } else {
        postId = '';
    }

    return fetch(`${url}${category}/posts${postId}`, GET).then(toJson);
}

export const getAllPosts = () => getPosts();

export const getPost = (postId) => getPosts(null, postId); 

export const getComments = (postId) => fetch(`${url}/posts/${postId}/comments`, GET).then(toJson);

const upVote = JSON.stringify({ "option": "upVote" });
const downVote = JSON.stringify({ "option": "downVote" });
const postVote = (url, up) => fetch(url, {...POST, body: up ? upVote : downVote}).then(toJson);

export const postUpVote = (postId) => postVote(`${url}/posts/${postId}`, true);
export const postDownVote = (postId) => postVote(`${url}/posts/${postId}`, false);

export const commentUpVote = (commentId) => postVote(`${url}/comments/${commentId}`, true);
export const commentDownVote = (commentId) => postVote(`${url}/comments/${commentId}`, false);

export const addPostAPI = (post) => fetch(`${url}/posts`, {...POST, body: JSON.stringify(post)}).then(toJson);
export const updatePostAPI = (post) => fetch(`${url}/posts/${post.id}`, {...PUT, body: JSON.stringify(post)}).then(toJson);
export const deletePostAPI = (postId) => fetch(`${url}/posts/${postId}`, {...DELETE}).then(toJson);

export const addCommentAPI = (comment) => {
    return fetch(`${url}/comments`, {...POST, body: JSON.stringify(comment)}).then(toJson);
};
export const updateCommentAPI = (comment) => fetch(`${url}/comments/${comment.id}`, {...PUT, body: JSON.stringify(comment)}).then(toJson);
export const deleteCommentAPI = (commentId) => fetch(`${url}/comments/${commentId}`, {...DELETE}).then(toJson);
