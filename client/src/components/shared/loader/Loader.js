import React from 'react';
import { FaSpinner } from "react-icons/fa";
import './Loader.css';

function Loader() {
    return (
        <div className="loader">
            <FaSpinner className="loader__spinner" />
        </div>
    )
}

export default Loader;
