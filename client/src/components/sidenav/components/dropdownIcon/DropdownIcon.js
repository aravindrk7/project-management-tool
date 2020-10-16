import React, { useState } from 'react';
import { FiMoreHorizontal } from "react-icons/fi";

import Dropdown from '../../../shared/dropdown/Dropdown';
import useComponentVisible from './../hook';
import './DropdownIcon.css'

function DropdownIcon(props) {
    const [top, setTop] = useState();
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    const handleOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTop(e.currentTarget.getBoundingClientRect().y);
        setIsComponentVisible(prev => !prev);
    };


    return (
        <div ref={ref}>
            <FiMoreHorizontal className="sidenav__itemContentIcon" onClick={(e) => handleOpen(e)} />
            <div >
                {isComponentVisible &&
                    <Dropdown top={top}>
                        {props.children}
                    </Dropdown>
                }
            </div>
        </div>
    )
}

export default DropdownIcon;
