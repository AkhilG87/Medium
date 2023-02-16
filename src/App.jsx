import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { React, useContext } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContext } from './context/authContext'
import Login from './Pages/login/Login'
import Navbar from './components/Navbar/Navbar'
import Home from './Pages/home/Home'
import Trending from './components/Trending/Trending'
import Write from './Pages/write/Write'
import Show from './Pages/show/Show'
import SignUp from './Pages/signUp/SignUp'
import AllBlogs from './components/AllBlogs/AllBlogs'

const queryClient = new QueryClient()

function App() {
  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/register" />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <SignUp />,
    },
    {
      path: '/blogs',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: '/blogs/new',
      element: (
        <ProtectedRoute>
          <Write />
        </ProtectedRoute>
      ),
    },
    {
      path: '/blogs/:id',
      element: (
        <ProtectedRoute>
          <Show />
        </ProtectedRoute>
      ),
    },
    {
      path: '/blogs/:id/edit',
      element: (
        <ProtectedRoute>
          <Write />
        </ProtectedRoute>
      ),
    },
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
