import React from 'react';
import { useSpring, animated } from 'react-spring';

import './Dropdown.css';

function Dropdown(props) {
    let style = {
        top: props.top + 25,
    };
    // Animations
    const slide = useSpring({
        from: { transform: 'scale(0)' },
        transform: 'scale(1)',
        config: { duration: 200 }
    });
    return (
        <animated.div className="dropdown" style={Object.assign(style, slide,props.options)} onClick={(e) => props.close(e)}>
            {props.children}
        </animated.div>
    )
}

export default Dropdown;
