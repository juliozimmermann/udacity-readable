import React from 'react';
import PropTypes from 'prop-types';

import { Badge, Button } from 'react-bootstrap';
import { TiThumbsDown, TiThumbsUp } from 'react-icons/lib/ti';

export const Vote = (props) => {
    return (
        <div>
            {
                props.showLabel && <span>Votes &nbsp;</span>
            }
            <Button className="padding-less" bsStyle="link"><TiThumbsUp size={24} onClick={(evt) => { evt.preventDefault(); props.voted(props.interaction.id, true); } }/></Button>
            &nbsp;
            <Badge>{props.interaction.voteScore}</Badge>
            &nbsp;
            <Button className="padding-less" bsStyle="link"><TiThumbsDown size={24} onClick={(evt) => {evt.preventDefault(); props.voted(props.interaction.id, false); }}/></Button>
        </div>
    );
}

Vote.propTypes = {
    interaction: PropTypes.object.isRequired,
    showLabel: PropTypes.bool.isRequired,
    voted: PropTypes.func.isRequired
}

export default Vote;