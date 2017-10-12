import React, { Component } from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line
import appStyle from '../App.css';

import { Media, Button } from 'react-bootstrap';

import { loadPostAndComments } from '../actions/integrations';

import Post from '../components/Post';
import NotFound from '../components/NotFound';

export class PostDetail extends Component { 

    componentDidMount() {
        this.loadPost(this.props.match.params.id);
    }

    loadPost(postId) {
        const isPostLoaded = this.props.posts.find(p => p.id === postId);

        if (!isPostLoaded) {
            this.props.loadPostAndComments(postId);
        }
    }

    render() {
        const post = this.props.posts.find(p => p.id === this.props.match.params.id);

        return (
            <div className="page-container">
                <h1>Post Detail</h1>
                {
                    (post &&
                    <div key={`post-${post.id}-container`} className="post-list">
                        <Media.List>
                            <Media.ListItem>
                                <Media.Body>
                                    <Post 
                                        key={post.id} 
                                        post={post} 
                                        displayComments={true} 
                                        postDeleted={() => this.props.history.push('/')}/>
                                </Media.Body>
                            </Media.ListItem>
                        </Media.List>
                        <Button onClick={() => this.props.history.goBack()}>Back</Button>
                    </div>) 
                    || 
                    <NotFound label="Home" to="/" />
                }
            </div>
        )
    }
}

function mapStateToProps({posts, comments}) {
    return {
        posts: Object.keys(posts)
                .map(postId => {
                    posts[postId].comments = Object.keys(comments)
                        .map(commentId => comments[commentId])
                        .filter(comment => comment.deleted === false && comment.parentId === postId);
                    return posts[postId];
                })
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPostAndComments: (post) => dispatch(loadPostAndComments(post)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
