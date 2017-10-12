import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//import uuid from 'uuid';

import Category from './Category';
import InteractionInfo from './InteractionInfo';
import AddEditPostModal from './AddEditPostDialog';
import AddEditComment from './AddEditComment';
import Comment from './Comment';

import { Button, Jumbotron, Panel, Row, Col, Well, Modal } from 'react-bootstrap';

import { postVoteDown, postVoteUp, commentVoteDown, commentVoteUp, deletePost, addComment, updateComment, deleteComment } from '../actions/integrations';

export class Post extends Component {

    state = {
        commentEditId: null,
        commentDeleteId: null,
        showModalDeleteComment: false,
        showModalDelete: false,
        showModalEdit: false
    }

    handleComment(comment) {

        if (comment) {
            if (comment.parentId === null) {
                comment.parentId = this.props.post.id;
                this.props.addComment(comment);
            } else {
                this.props.editComment(comment);
            }
        }

        this.setState({ commentEditId: null });
    }

    handleEditComment(commentId) {
        this.setState({ commentEditId: commentId });
    }

    handlePostDelete(postId) {
        this.props.deletePost(postId);

        this.setState({ showModalDelete: false });

        this.props.postDeleted();
    }

    handleCommentDelete(commentId) {
        this.setState({ commentDeleteId: commentId, showModalDeleteComment: true });
    }

    handleCommentDeleteConfirmed() {
        this.props.deleteComment(this.state.commentDeleteId);

        this.setState({ commentDeleteId: null, showModalDeleteComment: false });
    }

    render() {
        const { props } = this;

        return (
            <div>
                <Jumbotron>
                    <h2><Category category={props.post.category} /> {props.post.title}</h2>
                    <InteractionInfo interaction={props.post} voted={props.votePost}/>
                    <p>{props.post.body}</p>
                    { 
                        props.displayComments && props.post.comments && ( 
                            <Panel header={props.post.comments.length === 0 ? 'No body commented this post. You can be the first one!' : `${props.post.comments.length} Comments`}>
    
                                {
                                    this.state.commentEditId === null && 
                                    <AddEditComment addUpdateComment={(newComment) => this.handleComment(newComment)} />
                                }
    
                                {
                                    props.post.comments.length > 0 &&
                                    props.post.comments.map(comment => 
                                            this.state.commentEditId === comment.id ?
                                                <Well key={`addEditCommentContainer-${comment.id}`}>
                                                    <AddEditComment 
                                                        addUpdateComment={(newComment) => this.handleComment(newComment)} 
                                                        comment={comment} />
                                                </Well>
                                            :
                                                <Comment key={`comment-${comment.id}`} 
                                                        editComment={(commentId) => this.handleEditComment(commentId)} 
                                                        deleteComment={(commentId) => this.handleCommentDelete(commentId)} 
                                                        comment={comment} 
                                                        commentVoted={props.voteComment} />
                                    )
                                }
                            </Panel>
                        )
                    }
                    <Row className="show-grid interaction-info">
                        <Col xs={8} md={8}>
                        </Col>
                        <Col xs={4} md={4} className="text-align-right">
                            <Button bsStyle="primary" onClick={() => this.setState({showModalEdit: true})}>Edit</Button>
                            &nbsp;
                            <Button bsStyle="danger" onClick={() => this.setState({showModalDelete: true})}>Delete</Button>
                        </Col>
                    </Row>
                </Jumbotron>

                <AddEditPostModal 
                    post={this.props.post} 
                    showModal={this.state.showModalEdit} 
                    hideModal={() => this.setState({showModalEdit: false})} 
                    categories={this.props.categories} />

                <Modal show={this.state.showModalDelete} onHide={() => this.setState({showModalDelete: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Are you sure that you want to delete this post?</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={() => this.handlePostDelete(this.props.post.id)}>Delete</Button>
                        <Button onClick={() => this.setState({showModalDelete: false})}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showModalDeleteComment} onHide={() => this.setState({showModalDeleteComment: false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Are you sure that you want to delete this comment?</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={() => this.handleCommentDeleteConfirmed()}>Delete</Button>
                        <Button onClick={() => this.setState({commentDeleteId: null, showModalDeleteComment: false})}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    displayComments: PropTypes.bool.isRequired,
    addComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    postDeleted: PropTypes.func.isRequired ,
    votePost: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
}

function mapStateToProps({ categories, comments }) {
    return {
        categories: Object.keys(categories).map(category => categories[category]),
        comments: comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        votePost: (post, up) => up ? dispatch(postVoteUp(post)) : dispatch(postVoteDown(post)),
        deletePost: (postId) => dispatch(deletePost(postId)),

        voteComment: (comment, up) => up ? dispatch(commentVoteUp(comment)) : dispatch(commentVoteDown(comment)),
        addComment: (comment) => dispatch(addComment(comment)),
        editComment: (comment) => dispatch(updateComment(comment)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);