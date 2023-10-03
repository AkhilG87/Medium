import React, { useEffect, useState } from "react";
import "./AllBlogs.scss";
import Blog from "../Blog/Blog";
import axios from "axios";

const AllBlogs = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);

  const fetch = async () => {
    const limit = page * 3;
    const { data } = await axios.get(
      `https://api-rfe1.vercel.app/blogs?skip=6&limit=${limit}`
    );
    setData(data);
  };
  useEffect(() => {
    fetch();
  }, [page]);

  return (
    <div className="allblogs">
      <div className="container">
        <div className="left">
          {data &&
            data.map((e) => (
              <Blog
                key={e._id}
                path={e._id}
                name={e.user.name}
                desc={e.desc}
                title={e.title}
                date={e.createdAt}
              />
            ))}
          <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
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
  );
};

export default AllBlogs;
