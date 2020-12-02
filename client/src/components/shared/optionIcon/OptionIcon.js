import React, { useState } from 'react';
import { FiMoreHorizontal } from "react-icons/fi";

import Dropdown from '../dropdown/Dropdown';
import useComponentVisible from '../../../hooks/componentVisible';
import './OptionIcon.css'

function OptionIcon(props) {
    const [top, setTop] = useState();
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const handleOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTop(e.currentTarget.getBoundingClientRect().y);
        setIsComponentVisible(prev => !prev);
    };
    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsComponentVisible(false);
    };


    return (
        <div ref={ref}>
            <FiMoreHorizontal className="optionIcon" onClick={(e) => handleOpen(e)} />
            <div >
                {isComponentVisible &&
                    <Dropdown top={top} close={handleClose}>
                        {props.children}
                    </Dropdown>
                }
            </div>
        </div>
    )
}

export default OptionIcon;
