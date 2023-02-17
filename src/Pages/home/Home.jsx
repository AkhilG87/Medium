import React from 'react'
import './Home.scss'
import image from '../../assets/A.png'
import Navbar from '../../components/Navbar/Navbar'
import Trending from '../../components/Trending/Trending'
import AllBlogs from '../../components/AllBlogs/AllBlogs'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  const { isLoading, error, data } = useQuery(['blogs'], () =>
    axios.get('http://localhost:4000/blogs?limit=6').then((res) => {
      return res.data
    }),
  )
  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

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
      <Trending data={data} />
      <AllBlogs />
    </>
  )
}

export default Home
