import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-bootstrap';

import Vote from './Vote';

export const InteractionInfo = (props) => (
    <Grid className="padding-less margin-less width-100">
        <Row className="show-grid interaction-info">
            <Col xs={8} md={8}>
                <h4>
                    <span>Written by {props.interaction.author} {new Date(props.interaction.timestamp).toDateString()}</span>
                </h4>
            </Col>
            <Col xs={4} md={4} className="text-align-right">
                <h4>
                    <Vote interaction={props.interaction} voted={props.voted} showLabel={true} />
                </h4>
            </Col>
        </Row>
    </Grid>
)

InteractionInfo.propTypes = {
    interaction: PropTypes.object.isRequired,
    voted: PropTypes.func.isRequired
}

export default InteractionInfo;