
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const MyText = ({ children, size, family, weight, color }) => {
    const style = Object.assign({}, {
        fontFamily: family || 'Arial',
        fontSize: size || '10vh',
        fontWeight: weight || 'bold',
        color: color || 'white'
    });

    return (
        <Text style={style}>
            {children}
        </Text>
    );
};

MyText.propTypes = {
    children: PropTypes.node,
    size: PropTypes.string,
    family: PropTypes.string,
    weight: PropTypes.string,
    color: PropTypes.string
};

export default MyText;
