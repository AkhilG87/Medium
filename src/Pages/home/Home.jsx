import React from 'react'
import './Home.scss'
import image from '../../assets/A.png'
import Navbar from '../../components/Navbar/Navbar'
import Trending from '../../components/Trending/Trending'
import AllBlogs from '../../components/AllBlogs/AllBlogs'
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="first">
          <div className="left">
            <div className="hh">
              <h1>Stay curious.</h1>
              <p>
                Discover stories,thinking and expertise from writers on any
                topic.
              </p>
              <div className="btn">
                <span>Start reading</span>
              </div>
            </div>
          </div>
          <div className="right">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
      <Trending />
      <AllBlogs />
    </>
  )
}

export default Home
