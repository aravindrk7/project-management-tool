import React from 'react';
import './Popup.css';
import { AiOutlineClose } from "react-icons/ai";
import { useSpring, animated } from 'react-spring';

function Popup(props) {
    const handleClosePopup = () => {
        props.closePopup();
    };
    // Animations
    const slide = useSpring({
        from: { marginTop: -500 },
        marginTop: 0,
    })

    return (
        <div className="popup" >
            <div className="popup__overlay">
                <animated.div className="popup__box" style={slide}>
                    <div className="popup__header">
                        <h1 className="popup__heading">{props.title}</h1>
                        <div className="popup__icon center" onClick={handleClosePopup}>
                            <AiOutlineClose title="Close" />
                        </div>
                    </div>
                    <div className="popup__content">
                        {props.children}
                    </div>
                </animated.div>
            </div>
        </div>
    )
}

export default Popup
