import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import "./write.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useMutation, useQuery } from "@tanstack/react-query";

const Write = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const params = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cc, setCc] = useState(false);

  const { data } = useQuery(["particularBlog", params.id], () =>
    axios.get("https://api-rfe1.vercel.app0/blogs/" + params.id).then((res) => {
      return res.data;
    })
  );

  useEffect(() => {
    if (params.id !== undefined) {
      setCc(true);
      setTitle(data.found.title);
      setContent(data.found.desc);
    }
  }, []);

  const addBlog = useMutation(
    async (tt) => {
      await axios.post("https://api-rfe1.vercel.app0/blogs", tt, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        navigate("/blogs");
      },
    }
  );

  const updateBlog = useMutation(
    async (tt) => {
      console.log(tt);
      await axios.put("https://api-rfe1.vercel.app0/blogs/" + params.id, tt, {
        withCredentials: true,
      });
    },
    {
      onSuccess: () => {
        navigate("/blogs");
      },
    }
  );

  return (
    <>
      <Navbar />
      <div className="write">
        <div className="container">
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label htmlFor="">Description</label>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          />
          {cc ? (
            <button
              className="publish"
              onClick={() => updateBlog.mutate({ title: title, desc: content })}
            >
              Update
            </button>
          ) : (
            <button
              className="publish"
              onClick={() => addBlog.mutate({ title: title, desc: content })}
            >
              Publish
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Write;
