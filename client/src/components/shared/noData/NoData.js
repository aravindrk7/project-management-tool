import React from 'react';
import './NoData.css';

function NoData(props) {
    return (
        <div className="noData">
            <p className="noData__message">{props.message}</p>
        </div>
    )
}

export default NoData
