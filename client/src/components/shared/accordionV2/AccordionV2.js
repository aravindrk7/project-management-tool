import React, { useState } from 'react';
import { FiChevronDown } from "react-icons/fi";
import './AccordionV2.css'

function AccordionV2(props) {
    const [showItems, setShowItems] = useState(true);
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
        <div className="accordionV2" >
            <header className="accordionV2__header" onClick={handleDropdown}>
                <div>
                    <p className="accordionV2__title">{props.title}</p>
                    {props.value !== 0
                        &&
                        <span className="accordionV2__titleValue">({props.value})</span>
                    }
                </div>
                <FiChevronDown className="accordionV2__headerIcon" style={rotation} />
            </header>
            <div className="accordionV2__content" >
                {showItems && props.children}
            </div>
        </div>
    )
}

export default AccordionV2;
