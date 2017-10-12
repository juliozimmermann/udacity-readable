import { getCategories, 
         getAllPosts, 
         //getPosts, 
         getPost, 
         getComments, 
         postUpVote, 
         postDownVote,
         commentUpVote,
         commentDownVote,
         addPostAPI,
         updatePostAPI,
         deletePostAPI,
         addCommentAPI,
         updateCommentAPI,
         deleteCommentAPI } from '../utils/PostsAPI';

import { addUpdatePost, addUpdateComment, addCategory } from '.';

const getId = (interaction) => typeof interaction === 'string' ? interaction : interaction.id;

export function loadAllData() {
    return function(dispatch) {
        Promise.all([
            getCategories(), 
            getAllPosts()
        ]).then( data => {
            data[0].categories.map( category => dispatch(addCategory(category)) );
            data[1].map( post => dispatch(loadPostAndComments(post)) );
        });
    }
}

export function loadCategories() {
    return function(dispatch) {
        getCategories().then( data => data.categories.map( category => dispatch(addCategory(category)) ));
    }
}

export function loadPosts() {
    return function(dispatch) {
        getAllPosts().then( posts => posts.map( post => dispatch(addUpdatePost(post)) ) );
    }
}

export function loadComments(post) {
    const postId = getId(post);

    return function (dispatch) {
        getComments(postId).then(comments => comments.map( comment => dispatch(addUpdateComment(comment)) ) );
    }
}

export function loadPostAndComments(post) {
    return function(dispatch) {
        dispatch(loadCategories());
        const postId = getId(post);

        const fetchPost = (typeof post === 'string') ?
            getPost(postId) :
            Promise.resolve(post);
        
        fetchPost.then(postLoaded => {
            dispatch(addUpdatePost(postLoaded));
        });
    
        dispatch(loadComments(postId));
    }
}

function postVote(post, up) {
    return function(dispatch) {
        const postId = getId(post);

        const fetchPost = up === true ? postUpVote(postId) : postDownVote(postId);
        
        fetchPost.then(postLoaded => {
            dispatch(addUpdatePost(postLoaded));
        });
    }
}

export function postVoteUp(post) {
    return postVote(post, true);
}
export function postVoteDown(post) {
    return postVote(post, false);
}


function commentVote(comment, up) {
    return function(dispatch) {
        const commentId = getId(comment);

        const fetchComment = up === true ? commentUpVote(commentId) : commentDownVote(commentId);
        
        fetchComment.then(commentLoaded => {
            dispatch(addUpdateComment(commentLoaded));
        });
    }
}

export function commentVoteUp(comment) {
    return commentVote(comment, true);
}
export function commentVoteDown(comment) {
    return commentVote(comment, false);
}

export function addPost(post) {
    return function(dispatch) {
        addPostAPI(post).then(addedPost => dispatch(addUpdatePost(addedPost)));
    }   
}
export function updatePost(post) {
    return function(dispatch) {
        updatePostAPI(post).then(updatedPost => dispatch(addUpdatePost(updatedPost)));
    }
}
export function deletePost(postId) {
    return function(dispatch) {
        deletePostAPI(postId).then(deletedPost => dispatch(loadPosts()));
    }
}


export function addComment(comment) {
    return function(dispatch) {
        addCommentAPI(comment).then(addedComment => dispatch(addUpdateComment(addedComment)));
    }   
}
export function updateComment(comment) {
    return function(dispatch) {
        updateCommentAPI(comment).then(updatedComment => dispatch(addUpdateComment(updatedComment)));
    }
}
export function deleteComment(commentId) {
    return function(dispatch) {
        deleteCommentAPI(commentId).then(deletedComment => dispatch(addUpdateComment(deletedComment)));
    }
}

