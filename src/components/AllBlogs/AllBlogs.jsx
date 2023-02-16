import React from 'react'
import './AllBlogs.scss'
import Blog from '../Blog/Blog'


const AllBlogs = ({data}) => {
  

  return (
    <div className="allblogs">
      <div className="container">
        <div className="left">
          {data.slice(6).map((e) => (
            <Blog
              key={e._id}
              path={e._id}
              name={e.user.name}
              desc={e.desc}
              title={e.title}
              date={e.createdAt}
            />
          ))}
        </div>
        <div className="right">
          <div className="title">
            <span>Discover more of what matters to you</span>
          </div>
          <div className="options">
            <div>
              <span>Programming</span>
            </div>
            <div>
              <span>Data Science</span>
            </div>
            <div>
              <span>Technology</span>
            </div>
            <div>
              <span>Self Improvement</span>
            </div>
            <div>
              <span>Writing</span>
            </div>
            <div>
              <span>Relatioships</span>
            </div>
            <div>
              <span>Machine Learning</span>
            </div>
            <div>
              <span>Productivity</span>
            </div>
            <div>
              <span>Politics</span>
            </div>
          </div>
          <hr />
          <div className="footer">
            <span>Help</span>
            <span>Status</span>
            <span>Writers</span>
            <span>Blog</span>
            <span>Careers</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>About</span>
            <span>Text to speech</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllBlogs
