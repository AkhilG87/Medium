import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";

import Post from "../Post/Post";
import "./Trending.scss";

const Trending = () => {
  const { isLoading, error, data } = useQuery(["blogs"], () =>
    axios.get("https://api-akhilg87.vercel.app/blogs?limit=6").then(
      (res) => {
        return res.data;
      },
      {
        keepPreviousData: true,
      }
    )
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div className="trending">
      <div className="container">
        <div className="tr">
          <div className="title">
            <svg width="28" height="29" viewBox="0 0 28 29" fill="none">
              <path fill="#fff" d="M0 .8h28v28H0z" />
              <g opacity="0.8">
                <path fill="#fff" d="M4 4.8h20v20H4z" />
                <circle cx="14" cy="14.79" r="9.5" stroke="#000" />
                <path
                  d="M5.46 18.36l4.47-4.48M9.97 13.87l3.67 3.66M13.67 17.53l5.1-5.09M16.62 11.6h3M19.62 11.6v3"
                  stroke="#000"
                />
              </g>
            </svg>
            <span>Trending on Medium</span>
          </div>
        </div>
        <div className="pp">
          {data &&
            data.map((e, index) => (
              <Post
                id={index + 1}
                key={e._id}
                path={e._id}
                name={e.user.name}
                title={e.title}
                date={e.createdAt}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
