import { FloatingLabel, Form, Button } from 'react-bootstrap';
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import "../CSS/Friends.css"

const animStr = (i) => `fadeInAnimation ${650}ms ease-out ${100 * (i + 1)}ms forwards`;

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
        // setSearchResults([]);
        getSearchResults();
    }, [searchText])
    
    const getSearchResults = async () => {
        const { data } = await axios.get(`/getSearchResults/${searchText}`);
        if (data.success) {
            setSearchResults(data.searchResults);
        }
    }

    const getCurrentFriends = async () => {
        const { data } = await axios.get("/getFriends");
        if (data.success) {
            setCurrentFriends(data.friends);
        }
    }

    const followUser = async (idToFollow) => {
        const { data } = await axios.post(`/followUser/${idToFollow}`);
        console.log(data.message);
        if (data.success) {
            getCurrentFriends();
        }
    }

    const unfollowUser = async (idToUnfollow) => {
        const { data } = await axios.delete(`/unfollowUser/${idToUnfollow}`);
        console.log(data.message);
        if (data.success) {
            getCurrentFriends();
        }
    }

    const searchCards = searchResults.map((user, i) => {
        return (
            <div key={i} className="user-display" style={{width: "80%", animation: animStr(i)}}>
                <label className='email-label'>{user.email}</label>
                <Button variant="outline-info" onClick={() => followUser(user.userId)}>Follow</Button>
            </div>
        )
    });
    
    const friendCards = currentFriends.map((friend, i) => {
        return (
            <div key={i} className="user-display" style={{width: "100%", animation: animStr(i)}}>
                <label className="email-label">{friend.email}</label>
                <Button variant="outline-danger" onClick={() => unfollowUser(friend.userId)}>Unfollow</Button>
            </div>
        )
    });
    
    return (
        <div className="friends-container">
            <div className="add-friends">
                <h1 className="center">Find User</h1>
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
                {searchCards}
            </div>
            <div className="current-friends">
                <h1 className="center">Following:</h1>
                {friendCards}
            </div>
        </div>
    )
}

export default Friends;