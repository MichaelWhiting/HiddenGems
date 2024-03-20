import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import '../CSS/Details.css'

function DetailsPage() {
    const [posts, setPosts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [showPosts, setShowPosts] = useState (true)
  const [showRatings, setShowRatings] = useState (true)

  const postCards = posts
  .filter(post => post.postId === 1)
  .map((post, i) => {
  return (
    <div key={i}>
      {post.locationName} {post.description}  {post.lat && <span>Latitude: {post.lat}</span>}
      {post.lng && <span>Longitude: {post.lng}</span>}
    </div>
  )
  })

  const fetchData = async () => {
    const postsRes = await axios.get("/getPost")
    setPosts(postsRes.data.post)
  }
  const displayPosts = () => {
    setShowPosts(true)
    setShowRatings(true)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const navigate = useNavigate();
  return (
    <div>
        {postCards}
    </div>
  )
}

export default DetailsPage