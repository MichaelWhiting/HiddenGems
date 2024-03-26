import React from 'react';
import { useSelector } from 'react-redux';

function Friends() {
    const userId = useSelector(state => state.userId);


    return (
        <div>
        </div>
    )
}

export default Friends;