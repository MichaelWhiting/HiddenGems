import { FloatingLabel, Form, Button } from 'react-bootstrap';
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import "../CSS/Friends.css"

function Friends() {
    const userId = useSelector(state => state.userId);
    const [searchResults, setSearchResults] = useState([]);
    const [currentFriends, setCurrentFriends] = useState([]);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    useEffect(() =>  {
        getCurrentFriends();
    }, [])

    useEffect(() =>  {
        getSearchResults();
    }, [searchText])
    
    const getSearchResults = async () => {
        const { data } = await axios.get(`/getSearchResults/${searchText}`);
        console.log(data.message);
        if (data.success) {
            setSearchResults(data.searchResults);
            console.log(data.searchResults);
        }
    }

    const getCurrentFriends = async () => {
        const { data } = await axios.get("/getFriends");
        console.log(data.message);
        if (data.success) {
            setCurrentFriends(data.friends);
            console.log(data.friends);
        }
    }
    
    const friendCards = currentFriends.map((friend, i) => {
        return (
            <div key={i}>
                <h3>{friend.email}</h3>
            </div>
        )
    })
    
    return (
        <div className="friends-container">
            <div className="add-friends">
                <h1 className="center">Friends</h1>
                <div className="search-bar">
                    <FloatingLabel label="email" className="custom-outline" style={{width: "60%"}}>
                        <Form.Control 
                            type='text' 
                            placeholder="email"
                            value={searchText} 
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />    
                    </FloatingLabel>
                    <Button 
                        variant="info" 
                        className="search-button" 
                        onClick={getSearchResults}
                    >
                        <Icon.Search/>
                    </Button>
                </div>
            </div>
            <div className="current-friends">
                <h1 className="center">Current Friends:</h1>
                {friendCards}
            </div>
        </div>
    )
}

export default Friends;