import React from 'react';
import './List.css';

function List(props) {
    return (
        <div className="list">
            {props.items?.map(item => (
                <div key={item._id} className="list__item">
                    <div className="list__user">
                        <div className="list__userCard center">
                            <img className="list__userIcon" src={"http://localhost:5000/uploads/" + item.displayPicture} alt="" />
                        </div>
                        <div className="list__userDetails">
                            <div className="list__userName">{item.displayName}</div>
                            <div className="list__userEmail">{item.email}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List;
