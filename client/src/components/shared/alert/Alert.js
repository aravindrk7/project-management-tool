import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Alert.css';
import { AiOutlineClose } from "react-icons/ai";

function Alert({ message, clearMessage, type }) {

    let style;

    const handleClear = () => {
        clearMessage();
    };
    if (type === 'error') {
        style = {
            background: 'rgb(255, 183, 183)',
            boxShadow: '0 0 5px rgb(255, 183, 183), 0 0 2px rgb(226, 0, 0)'
        };
    }
    else {
        style = {
            background: 'rgb(178, 224, 169)',
            boxShadow: '0 0 5px rgb(178, 224, 169), 0 0 2px rgb(1, 105, 9)'
        };
    }

    // Animations
    const fade = useSpring({
        from: { opacity: 0 },
        opacity: 1,
    });
    return (
        <animated.div className="message" style={Object.assign(style, fade)} >
            <span className="message__text">{message}</span>
            <AiOutlineClose className="message__clear" onClick={handleClear} />
        </animated.div>
    )
}

export default Alert;
