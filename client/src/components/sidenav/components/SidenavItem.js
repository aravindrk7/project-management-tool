import React, { useState } from 'react';

import { FiChevronDown } from "react-icons/fi";
function SidenavItem(props) {
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
        <div className="sidenav__item" >
            <div className="sidenav__itemHeader" onClick={handleDropdown}>
                <div>
                    <p className="sidenav__itemHeaderName">{props.title}</p>
                    {(props.children.props.projects?.length || props.children.props.teams?.length)
                        &&
                        <span className="sidenav__itemHeaderCount">({props.children.props.projects?.length || props.children.props.teams?.length})</span>
                    }
                </div>
                <FiChevronDown className="sidenav__itemHeaderIcon" style={rotation} />
            </div>
            <div className="sidenav__itemContentsContainer" >
                {
                    showItems && props.children
                }
            </div>
        </div>
    )
}

export default SidenavItem;
