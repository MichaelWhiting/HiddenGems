
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"



function Discover() {
  const [posts, setPosts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [showPosts, setShowPosts] = useState (true)
  const [showRatings, setShowRatings] = useState (true)

  const postCards = posts.map((post, i) => {
  return (
    <div key={i}>
      {post.locationName} {post.description}
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
    <>
    <div className='discover'>
      <h1>GEMS YOU MIGHT LIKE</h1>
      <div className='GemContainer'>
        {postCards}
      </div>
    </div>
    </>
  )
}

export default Discover


