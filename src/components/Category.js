import React from 'react';
import PropTypes from 'prop-types';

import { Label } from 'react-bootstrap';

export const Category = (props) => {
    return (
            <Label bsStyle="warning">{`#${props.category}`}</Label>
    );
}

Category.propTypes = {
    category: PropTypes.string.isRequired
}

export default Category;