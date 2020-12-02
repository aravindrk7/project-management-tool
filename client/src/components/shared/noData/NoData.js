import React from 'react';
import './NoData.css';

function NoData(props) {
    let style = {
        top: props.top
    };

    return (
        <div className="noData" style={style}>
            <p style={{ fontSize: props.size }} className="noData__message">{props.message}</p>
        </div>
    )
}

export default NoData
