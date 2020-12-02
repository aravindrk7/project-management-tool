import React, { useState } from 'react';
import { FiChevronDown } from "react-icons/fi";
import './Accordion.css';

function Accordion(props) {
    const [showItems, setShowItems] = useState(props.expand);
    const [rotation, setRotation] = useState({
        transform: (props.expand) ? 'rotate(180deg)' : 'rotate(0deg)'
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
                    {props.ItemsCount > 0
                        &&
                        <span className="accordion__itemsCount">({props.ItemsCount})</span>
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
