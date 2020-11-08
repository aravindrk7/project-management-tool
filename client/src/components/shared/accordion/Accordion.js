import React, { useState } from 'react';
import { FiChevronDown } from "react-icons/fi";

function Accordion(props) {
    const [showItems, setShowItems] = useState(false);
    const [rotation, setRotation] = useState({
        transform: 'rotate(0deg)'
    });

    const handleDropdown = () => {
        setShowItems(prev => !prev);
        if (showItems) {
            setRotation({
                transform: 'rotate(360deg)'
            })
        }
        else {
            setRotation({
                transform: 'rotate(180deg)'
            })
        }

    };

    return (
        <div className="accordion" >
            <header className="accordion__header" onClick={handleDropdown}>
                <div>
                    <p className="accordion__title">{props.title}</p>
                    {props.value
                        &&
                        <span className="accordion__titleValue">({props.value})</span>
                    }
                </div>
                <FiChevronDown className="accordion__headerIcon" style={rotation} />
            </header>
            <div className="accordion__content" >
                {showItems && props.children}
            </div>
        </div>
    )
}

export default Accordion;
