import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export const NotFound = (props) => {
    return (
        <div>
            <h1>Sorry! This page/post was not found! Try find what you are looking for from <Link to={props.to}>{props.label}</Link> ...</h1>
        </div>
    );
}

NotFound.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
}

export default NotFound;