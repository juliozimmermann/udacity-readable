import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup, Col, ControlLabel, FormControl, Button, Modal } from 'react-bootstrap';

import { validateEmptyField } from '../utils/Validations';

export class AddEditPost extends Component {
    baseState = {
        post: {
            title: '',
            body: '',
            author: '',
            category: ''
        },
        showModalValidation: false
    }

    state = {
        ...this.baseState
    }

    componentDidMount() {
        const basePost = this.props.post || this.baseState.post;

        this.setState({
            post: { ...basePost }
        })
    }

    handleSubmit = (submit = true) => {

        let localPost = null;

        if (this.validateBeforeSubmit() ||
            submit === false) {
            
            if (submit) {
                localPost = {
                    ...this.state.post,
                    timestamp: Date.now()
                };
            }

            this.props.addUpdatePost(localPost);
            
            this.resetState();
        }
    }

    resetState = () => {
        this.setState(this.baseState);
    }

    validateBeforeSubmit = () => {
        let valid = true;
        
        valid = valid && validateEmptyField(this.state.post.author) === 'success';
        valid = valid && validateEmptyField(this.state.post.body) === 'success';
        valid = valid && validateEmptyField(this.state.post.title) === 'success';
        valid = valid && validateEmptyField(this.state.post.category) === 'success';

        if (valid === false) {
            this.setState({ showModalValidation: true });
        }

        return valid;
    }

    handleCloseModal = () => {
        this.setState({showModalValidation: false});
    }

    render() {
        return (
            <Form horizontal  onSubmit={(evt) => { evt.preventDefault(); this.handleSubmit(); } } >
                <FormGroup validationState={ validateEmptyField(this.state.post.title) }>
                    <Col componentClass={ControlLabel} sm={2}>
                        Title
                    </Col>
                    <Col sm={10}>
                        <FormControl type="text" placeholder="title" onChange={(evt) => this.setState({ post: {...this.state.post, title: evt.target.value} }) } value={this.state.post.title} />
                    </Col>
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup validationState={ validateEmptyField(this.state.post.body) }>
                    <Col componentClass={ControlLabel} sm={2}>
                        Body
                    </Col>
                    <Col sm={10}>
                        <FormControl componentClass="textarea" placeholder="body" onChange={(evt) => this.setState({ post: {...this.state.post, body: evt.target.value } }) } value={this.state.post.body} />
                    </Col>
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup validationState={ validateEmptyField(this.state.post.author) }>
                    <Col componentClass={ControlLabel} sm={2}>
                        Author
                    </Col>
                    <Col sm={10}>
                        <FormControl type="text" placeholder="author" onChange={(evt) => this.setState({ post: {...this.state.post, author: evt.target.value } }) } value={this.state.post.author} />
                    </Col>
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup validationState={ validateEmptyField(this.state.post.category) }>
                    <Col componentClass={ControlLabel} sm={2}>
                        Category
                    </Col>
                    <Col sm={10}>
                        <FormControl componentClass="select" placeholder="category" onChange={(evt) => this.setState({ post: {...this.state.post, category: evt.target.value } }) } value={this.state.post.category} >
                            <option disabled value="">Select a category</option>
                            {
                                this.props.categories &&
                                this.props.categories.map(category => <option key={`option-${category.path}`} value={`${category.path}`}>{category.name}</option>)
                            }
                        </FormControl>
                    </Col>
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                    <Col  sm={2}>
                    </Col>
                    <Col sm={10} style={{textAlign: 'right'}}>
                        <Button type="submit" 
                                bsStyle="primary" 
                                style={{marginLeft: '20px'}} >
                            { this.props.post === null ? 'Add post' : 'Edit post' }
                        </Button>
                        <Button bsStyle="default" 
                                style={{marginLeft: '5px'}} 
                                onClick={() => this.handleSubmit(false)}>
                            Cancel
                        </Button>
                    </Col>
                    <FormControl.Feedback />
                </FormGroup>
                <Modal show={this.state.showModalValidation} onHide={(evt) => this.handleCloseModal(evt)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Please fill all required fields.</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={(evt) => this.handleCloseModal(evt)}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        );
    }
}

AddEditPost.propTypes = {
    post: PropTypes.object,
    addUpdatePost: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
}

export default AddEditPost;