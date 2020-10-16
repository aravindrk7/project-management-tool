import React, { useState } from 'react';
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
function SidenavItem(props) {
    const [showItems, setShowItems] = useState(true);

    const handleDropdown = () => {
        setShowItems(prev => !prev)
    };

    return (
        <div className="sidenav__item">
            <div className="sidenav__itemHeader" onClick={handleDropdown}>
                <div>
                    <p className="sidenav__itemHeaderName">{props.title}</p>
                    <span className="sidenav__itemHeaderCount">({props.children.props.projects?.length || props.children.props.teams?.length})</span>
                </div>

                {showItems
                    ? (<FiChevronUp className="sidenav__itemHeaderIcon" />)
                    : (<FiChevronDown className="sidenav__itemHeaderIcon" />)
                }
            </div>
            {
                showItems && props.children
            }
        </div>
    )
}

export default SidenavItem;
