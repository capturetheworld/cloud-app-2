import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, Pressable } from 'react-native';

const Button = ({ onPress, title }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '20vw',
        height: '15vw',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: '2vw',
        elevation: 3,
        backgroundColor: '#eee',
    },
    text: {
        fontFamily: 'Grotesque',
        fontSize: '2vw',
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'black',
    },
});

Button.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string
};

export default Button;
