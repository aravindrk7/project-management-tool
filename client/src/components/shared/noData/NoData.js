import React from 'react';
import './NoData.css';

function NoData(props) {
    return (
        <div className="noData">
            <p>{props.message}</p>
        </div>
    )
}

export default NoData
