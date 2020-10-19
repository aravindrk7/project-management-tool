import React from 'react';
import { useSpring, animated } from 'react-spring';

import useComponentVisible from './../../sidenav/components/hook';

import './Dropdown.css';

function Dropdown(props) {
    let style = {
        top: props.top + 25,
    };
    // Animations
    const slide = useSpring({
        from: { opacity: 0 },
        opacity: 1
    });
    return (
        <animated.div className="dropdown" style={Object.assign(style, slide)} onClick={(e) => props.close(e)}>
            {props.children}
        </animated.div>
    )
}

export default Dropdown;