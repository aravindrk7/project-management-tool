import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Dropdown.css';

function Dropdown(props) {

    let style = {
        top: props.top + 25,
    };
    // Animations
    const slide = useSpring({
        from: {  opacity: 0 },
        opacity: 1
    });
    return (
        <animated.div className="dropdown" style={Object.assign(style, slide)}>
            {props.children}
        </animated.div>
    )
}

export default Dropdown;
