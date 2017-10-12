import React from 'react';
import PropTypes from 'prop-types';

import { TiEdit, TiDelete } from 'react-icons/lib/ti';
import { Media, Panel, Button } from 'react-bootstrap';

import InteractionInfo from '../components/InteractionInfo';

export const Comment = (props) => {
    
    const { comment } = props;

    return (
        <div>
            <Media>
                <Media.Body>
                    <Panel className="comment-panel" header={
                        <div>
                            <InteractionInfo className="interaction-info" interaction={comment} voted={props.commentVoted}/>
                            <div className="width-100">
                            <Button className="padding-less" bsStyle="link" onClick={(evt) => props.editComment(comment.id)}>
                                <TiEdit size={24} />
                            </Button>
                            <Button 
                                className="padding-less" 
                                bsStyle="link">
                                    <TiDelete size={24} onClick={(evt) => props.deleteComment(comment.id)} />
                            </Button>
                        </div>
                        </div>
                    }>
                        {comment.body}
                        
                    </Panel>
                </Media.Body>
            </Media>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    commentVoted: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
}

export default Comment;