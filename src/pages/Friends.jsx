import { FloatingLabel, Form, Button } from 'react-bootstrap';
import * as Icon from "react-bootstrap-icons";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';

import "../CSS/Friends.css"

function Friends() {
    const userId = useSelector(state => state.userId);
    const [searchResults, setSearchResults] = useState([]);
    const [currentFriends, setCurrentFriends] = useState([]);

    const getSearchResults = async () => {

    }

    const getCurrentFriends = async () => {

    }

    return (
        <div className="friends-container">
            <div className="add-friends">
                <h1 className="center">Friends</h1>
                <div className="search-bar">
                    <FloatingLabel label="email" className="custom-outline" style={{width: "60%"}}>
                        <Form.Control type='text' placeholder="email"/>    
                    </FloatingLabel>
                    <Button variant="info" className="search-button" style={{width: "10%"}}>
                        <Icon.Search/>
                    </Button>
                </div>
            </div>
            <div className="current-friends">
                <h1 className="center">Current Friends:</h1>
            </div>
        </div>
    )
}

export default Friends;