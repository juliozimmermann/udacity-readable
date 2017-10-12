import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import uuid from 'uuid';

import { Modal } from 'react-bootstrap';

import AddEditPost from './AddEditPost';

import { addPost, updatePost } from '../actions/integrations';

export class AddEditPostDialog extends Component {

    state = {
        showModal: false
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal
        });
    }

    updateModelModal(value) {
        this.setState({
            showModal: value
        });
    }

    handlePost(post) {
        if (post) {
            if (post.id === undefined) {
                post.id = uuid();
                this.props.addPost(post);
            } else {
                this.props.editPost(post);
            }
        }

        this.handleClose();
    }

    handleClose(evt) {
        this.updateModelModal(false);

        this.props.hideModal(evt);
    }
    
    render() {
        const { props } = this;

        return (
            <Modal show={this.state.showModal} onHide={(evt) => this.handleClose(evt)}>
                <Modal.Header closeButton>
                    <Modal.Title>Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddEditPost 
                        post={props.post} 
                        addUpdatePost={(modifiedPost) => this.handlePost(modifiedPost)} 
                        categories={props.categories}/>
                </Modal.Body>
            </Modal>
        )
    }
}

AddEditPostDialog.propTypes = {
    post: PropTypes.object,
    categories: PropTypes.array.isRequired,
    addPost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    hideModal: PropTypes.func
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => dispatch(addPost(post)),
        editPost: (post) => dispatch(updatePost(post))
    }
}

export default connect(null, mapDispatchToProps)(AddEditPostDialog);