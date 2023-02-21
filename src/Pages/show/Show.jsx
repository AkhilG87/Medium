import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { AuthContext } from '../../context/authContext'
import './Show.scss'

const Show = () => {
  const navigate = useNavigate()
  const params = useLocation().pathname.split('/')[2]
  const { currentUser } = useContext(AuthContext)

  const deleteBlog = useMutation(
    async (param) => {
      await axios.delete('http://localhost:4000/blogs/' + param, {
        withCredentials: true,
      })
    },
    {
      onSuccess: () => {
        navigate('/blogs')
      },
    },
  )
  const { isLoading, error, data } = useQuery(
    ['particularBlog', params],
    () =>
      axios.get('http://localhost:4000/blogs/' + params).then((res) => {
        return res.data
      }),
    {
      keepPreviousData: true,
    },
  )
  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <>
      <Navbar />
      <div id="show">
        <div className="container">
          <h1>{data.found.title}</h1>
          <div className="content">
            <div dangerouslySetInnerHTML={{ __html: data.found.desc }}></div>
          </div>
          {currentUser._id === data.found.user ? (
            <div className="button">
              <button
                className="up"
                onClick={() => {
                  navigate('/blogs/' + params + '/edit')
                }}
              >
                Update
              </button>
              <button className="de" onClick={() => deleteBlog.mutate(params)}>
                Delete
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}
export default Show
