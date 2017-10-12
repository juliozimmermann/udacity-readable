import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { Form, FormGroup, Col, ControlLabel, FormControl, Button, Modal } from 'react-bootstrap';

import { validateEmptyField } from '../utils/Validations';

export class AddEditComment extends Component {

    baseState = {
        comment: {
            id: null,
            timestamp: null,
            author: '',
            body: '',
            parentId: null
        },
        showModalValidation: false
    }

    state = {
        ...this.baseState
    }

    componentDidMount() {
        const baseComment = this.props.comment || this.baseState.comment;

        this.setState({
            comment: { ...baseComment }
        });
    }

    handleSubmit = (submit = true) => {

        if (this.validateBeforeSubmit() || 
            submit === false) 
        {
            let localComment = null;

            if (submit === true) {
                localComment = this.state.comment;
                
                localComment.id = localComment.id || uuid();
                localComment.timestamp = Date.now();
            }

            this.props.addUpdateComment(localComment);

            this.resetState();
        }
    }

    resetState = () => {
        this.setState(this.baseState);
    }

    validateBeforeSubmit = () => {
        let valid = true;
        
        valid = valid && validateEmptyField(this.state.comment.author) === 'success';
        valid = valid && validateEmptyField(this.state.comment.body) === 'success';

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
            <div>
                <Form horizontal  onSubmit={(evt) => { evt.preventDefault(); this.handleSubmit(); } } >
                    <FormGroup validationState={ validateEmptyField(this.state.comment.author) }>
                        <Col componentClass={ControlLabel} sm={2}>
                            Author
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" placeholder="author" onChange={(evt) => this.setState({ comment: { ...this.state.comment, author: evt.target.value }}) } value={this.state.comment.author} />
                        </Col>
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup validationState={ validateEmptyField(this.state.comment.body)}>
                        <Col componentClass={ControlLabel} sm={2}>
                            Comment
                        </Col>
                        <Col sm={10}>
                            <FormControl componentClass="textarea" placeholder="comment" onChange={(evt) => this.setState({ comment: { ...this.state.comment, body: evt.target.value }}) } value={this.state.comment.body} />
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
                                { this.props.comment === undefined ? 'Add comment' : 'Edit comment' }
                            </Button>
                            <Button bsStyle="default" 
                                    style={{marginLeft: '5px'}} 
                                    onClick={() => this.handleSubmit(false)}>
                                Cancel
                            </Button>
                        </Col>
                        <FormControl.Feedback />
                    </FormGroup>
                </Form>
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
            </div>
        )
    }
}

AddEditComment.propTypes = {
    comment: PropTypes.object,
    addUpdateComment: PropTypes.func.isRequired
}

export default AddEditComment;